# CI/CD

CI/CD (Continuous Integration and Continuous Deployment) refers to the automation of testing, building, and deployment for all repositories within the RubberDuckCrew organization.

The workflows, tools, and standards described here ensure consistent quality and efficient processes across the organization. For project-specific details, please refer to the documentation in the respective repositories.

::: danger Restriction in forks
Due to security restrictions, GitHub Actions (CI builds) in forks **cannot be fully executed**.
Pull requests from forks can still run limited checks (such as unit tests or linting), but they **do not have access to the secrets** required to build APKs or App Bundles.
As a result, any build steps involving signing keys or deployment credentials are **automatically skipped**.
:::

## Renovate

Renovate is a tool for automating dependency updates. It helps to keep the project's dependencies up-to-date by creating pull requests for new versions of dependencies.

We use a central Renovate configuration, located at [`renovate-rubberduckcrew.json`](https://github.com/RubberDuckCrew/.github/blob/main/configs/renovate/renovate-rubberduckcrew.json) in the `.github` repository. This file defines global rules and standards for all repositories in the organization.

In the individual repositories, enable Renovate by creating a `.github/renovate.json` file that extends the central configuration and adds repository-specific rules:

```json
{
    "$schema": "https://docs.renovatebot.com/renovate-schema.json",
    "extends": [
        "github>RubberDuckCrew/.github//configs/renovate/renovate-rubberduckcrew.json"
    ]
}
```

This will automatically apply all standard rules and labels. You can add repository-specific rules in this file if needed.

For more information and examples, see the [Renovate documentation](https://docs.renovatebot.com/).

## Docs build and deployment

To automate the building and deployment of documentation, we use a GitHub Actions workflow that is defined globally in [`action-docs.yml`](https://github.com/RubberDuckCrew/.github/blob/main/.github/workflows/action-docs.yml).

In the `build` job it builds the markdown files using [vitepress](https://vitepress.dev/). After that, the documentation is deployed to Cloudflare Pages by the `deploy` job.

To use this workflow in the individual repositories, create a `.github/workflows/docs.yml` file that references the global workflow:

```yml
name: Build and deploy docs

on:
    push:
        branches: [main]
        paths: [docs/**, .github/workflows/docs.yml]
    pull_request:
        types: [opened, labeled, synchronize]
        paths: [docs/**, .github/workflows/docs.yml]

jobs:
    run:
        uses: RubberDuckCrew/.github/.github/workflows/action-docs.yml@main
        secrets: inherit
        with:
            project-name: YOUR_PROJECT_NAME
        permissions:
            contents: read
            deployments: write
            pull-requests: write
```

> [!IMPORTANT]
> Make sure to replace `YOUR_PROJECT_NAME` with the actual project name used in Cloudflare Pages and to set the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets in the repository.

## Sync labels

The "Sync labels" workflow ensures that all repositories in the RubberDuckCrew organization use a consistent set of labels for issues and pull requests.

The labels are defined globally in [`labels.yml`](https://github.com/RubberDuckCrew/.github/blob/main/configs/conventions/labels.yml) in the `.github` repository and documented in the [Contributing conventions](/contributing/conventions#labels).

To sync them automatically to each repository, a GitHub Actions workflow is set up in the `.github/workflows/sync-labels.yml` file that uses the global workflow [`action-sync-labels.yml`](https://github.com/RubberDuckCrew/.github/blob/main/.github/workflows/action-sync-labels.yml). The individual workflow runs on a schedule and can also be triggered manually.

```yml
name: Sync labels

on:
    schedule:
        - cron: "0 3 * * 0"
    workflow_dispatch:

jobs:
    run:
        uses: RubberDuckCrew/.github/.github/workflows/action-sync-labels.yml@main
        permissions:
            issues: write
```

## Enforce conventions

To ensure that all contributions adhere to the project's conventions, we use a GitHub Actions workflow [`action-conventions.yml`](https://github.com/RubberDuckCrew/.github/blob/main/.github/workflows/action-conventions.yml) to enforce these rules. It is enabled by `.github/workflows/conventions.yml` in the individual repositories and runs on pull requests and checks for required labels and branch naming conventions:

```yml
name: Enforce conventions

on:
    pull_request:
        types: [opened, labeled, unlabeled, synchronize]

jobs:
    run:
        uses: RubberDuckCrew/.github/.github/workflows/action-conventions.yml@main
        permissions:
            issues: write
            pull-requests: write
```

The `enforce-labels` job of [`action-conventions.yml`](https://github.com/RubberDuckCrew/.github/blob/main/.github/workflows/action-conventions.yml) ensures that at least one label is assigned to the pull request, excluding meta labels like "Request Build", "Discussion", "Question", "Wontfix", "Duplicate", and "Work in Progress". If no label is assigned, it adds a comment prompting the user to assign a label.

The `enforce-branch-names` job of [`action-conventions.yml`](https://github.com/RubberDuckCrew/.github/blob/main/.github/workflows/action-conventions.yml) checks that the pull request branch name matches our [Branch naming](/contributing/conventions#branch-naming) conventions. Therefore, the allowed branch naming patterns are defined in [`branches.yml`](https://github.com/RubberDuckCrew/.github/blob/main/configs/conventions/branches.yml).

## Actionlint

Actionlint is a linter for GitHub Actions workflows. It helps to ensure that your workflow files are valid and follow best practices.

To run Actionlint automatically we use a GitHub Action workflow that is defined globally in [`action-actionlint.yml`](https://github.com/RubberDuckCrew/.github/blob/main/.github/workflows/action-actionlint.yml). In each individual repository, enable it by creating a `.github/workflows/actionlint.yml` file that uses the global workflow:

```yml
name: Actionlint

on:
    pull_request:
        paths: [.github/workflows/**]

jobs:
    run:
        uses: RubberDuckCrew/.github/.github/workflows/action-actionlint.yml@main
```

To run Actionlint locally, you have two options:

1. **Direct installation:** Install Actionlint directly on your system. See the [Actionlint documentation](https://github.com/rhysd/actionlint/blob/v1.7.7/docs/install.md) for installation instructions.

2. **Using a container image:** Use a container image with Actionlint already installed. Run the following command:

    ```shell
    podman run --rm -v .:/repo --workdir /repo rhysd/actionlint:latest -color
    ```

    > [!NOTE]
    > If you are using Docker, replace `podman` with `docker` in the command above.
