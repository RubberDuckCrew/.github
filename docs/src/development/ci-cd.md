# CI/CD

CI/CD (Continuous Integration and Continuous Deployment) refers to the automation of testing, building, and deployment for all repositories within the RubberDuckCrew organization.

The workflows, tools, and standards described here ensure consistent quality and efficient processes across the organization. For project-specific details, please refer to the documentation in the respective repositories.

## Renovate

Renovate is a tool for automating dependency updates. It helps keep your project dependencies up-to-date by creating pull requests for new versions of dependencies.

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

## Sync labels

The "Sync labels" workflow ensures that all repositories in the RubberDuckCrew organization use a consistent set of labels for issues and pull requests.

The labels are defined globally in [`labels.yml`](https://github.com/RubberDuckCrew/.github/blob/main/configs/conventions/labels.yml) in the `.github` repository and documented in the [Contributing conventions](/contributing/conventions#labels).

To sync them automatically to each repository, a GitHub Actions workflow is set up in the `.github/workflows/sync-labels.yml` file. This workflow runs on a schedule and can also be triggered manually.

```yml
name: Sync labels

on:
    schedule:
        - cron: "0 3 * * 0"
    push:
        branches: [main]
        paths: [.github/workflows/sync-labels.yml]
    workflow_dispatch:

jobs:
    sync-labels:
        name: Sync labels
        runs-on: ubuntu-latest

        permissions:
            issues: write

        steps:
            - name: Sync labels
              uses: srealmoreno/label-sync-action@v2.0.0
              with:
                  clean-labels: true
                  config-file: https://raw.githubusercontent.com/RubberDuckCrew/.github/refs/heads/main/configs/conventions/labels.yml
```

## Enforce conventions

To ensure that all contributions adhere to the project's conventions, we use a GitHub Actions workflow to enforce these rules. It runs on pull requests and checks for required labels and branch naming conventions.

The `enforce-labels` job ensures that at least one label is assigned to the pull request, excluding meta labels like "Request Build", "Discussion", "Question", "Wontfix", "Duplicate", and "Work in Progress". If no label is assigned, it adds a comment prompting the user to assign a label.

The `enforce-branch-names` job checks that the pull request branch name matches our [Branch naming](/contributing/conventions#branch-naming) conventions. Therefore, the allowed branch naming patterns are defined in [`branches.yml`](https://github.com/RubberDuckCrew/.github/blob/main/configs/conventions/branches.yml) in the `.github` repository.

```yml
name: Enforce conventions

on:
    pull_request_target:
        types: [opened, labeled, unlabeled]

jobs:
    enforce-labels:
        name: Enforce pull request labels
        runs-on: ubuntu-latest

        permissions:
            issues: write
            pull-requests: write

        steps:
            - name: Enforce pull request labels
              uses: mheap/github-action-required-labels@v5
              with:
                  mode: minimum
                  count: 1
                  labels: "^(?!(⚗️ Request Build$|💬 Discussion$|❓ Question$|❌ Wontfix$|🔄 Duplicate$|🚧 Work in Progress$)).+" # Exclude meta labels (do not describe PR content)
                  use_regex: true
                  add_comment: true
                  message: "🏷️ Please assign at least one label to this pull request before requesting a review. See our [contributing conventions](https://rubberduckcrew.pages.dev/contributing/conventions) for details."

    enforce-branch-names:
        name: Enforce pull request branch names
        runs-on: ubuntu-latest

        steps:
            - name: Enforce pull request branch names
              uses: IamPekka058/branchMatchRegex@v1
              with:
                  inputPath: https://raw.githubusercontent.com/RubberDuckCrew/.github/refs/heads/main/configs/conventions/branches.yml
                  useWildcard: true
```

## Actionlint

Actionlint is a linter for GitHub Actions workflows. It helps to ensure that your workflow files are valid and follow best practices.

To run Actionlint automatically we use a GitHub Action workflow defined in `.github/workflows/actionlint.yml`:

```yml
name: Actionlint

on:
    pull_request:
        paths: [.github/workflows/**]

jobs:
    actionlint:
        name: Actionlint
        runs-on: ubuntu-latest

        steps:
            - name: Checkout
              uses: actions/checkout@v5

            - name: Run actionlint
              uses: raven-actions/actionlint@v2
```

To run Actionlint locally, you can use the following command:

```shell
podman run --rm -v .:/repo --workdir /repo rhysd/actionlint:latest -color
```

> **Note:** You need to have Podman or Docker installed to run Actionlint locally. If you are using Docker, you can replace `podman` with `docker` in the command above.
