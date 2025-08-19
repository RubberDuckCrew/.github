# CI/CD

CI/CD (Continuous Integration and Continuous Deployment) refers to the automation of testing, building, and deployment for all repositories within the RubberDuckCrew organization.

The workflows, tools, and standards described here ensure consistent quality and efficient processes across the organization. For project-specific details, please refer to the documentation in the respective repositories.

## Sync labels

The "Sync labels" workflow ensures that all repositories in the RubberDuckCrew organization use a consistent set of labels for issues and pull requests. The global label list is defined in [`configs/conventions/labels.yml`](https://github.com/RubberDuckCrew/.github/blob/main/configs/conventions/labels.yml) and documented at [rubberduckcrew.pages.dev/contributing/conventions](https://rubberduckcrew.pages.dev/contributing/conventions). This workflow automatically synchronizes these organization-wide labels to each repository, keeping them up to date and standardized.

The workflow runs every Sunday at 3:00 UTC and can also be triggered manually.

```yml
name: Sync labels

on:
    schedule:
        - cron: "0 3 * * 0"
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
                  config-file: https://raw.githubusercontent.com/RubberDuckCrew/gitdone/refs/heads/main/configs/conventions/labels.yml
```

## Actionlint

Actionlint is a linter for GitHub Actions workflows. It helps to ensure that your workflow files are valid and follow best practices.

To use Actionlint, you need to create a GitHub Actions workflow file (e.g., `.github/workflows/actionlint.yml`) with the following content:

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
