# CI/CD

CI/CD (Continuous Integration and Continuous Deployment) refers to the automation of testing, building, and deployment for all repositories within the RubberDuckCrew organization.

The workflows, tools, and standards described here ensure consistent quality and efficient processes across the organization. For project-specific details, please refer to the documentation in the respective repositories.

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
