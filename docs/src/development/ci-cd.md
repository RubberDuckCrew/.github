# CI/CD

CI/CD (Continuous Integration and Continuous Deployment) refers to the automation of testing, building, and deployment for all repositories within the RubberDuckCrew organization.

The workflows, tools, and standards described here ensure consistent quality and efficient processes across the organization. For project-specific details, please refer to the documentation in the respective repositories.

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
