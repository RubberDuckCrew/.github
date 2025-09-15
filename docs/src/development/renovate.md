# Renovate

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

::: warning Library repositories
If the repository is a library (e.g. a shared module or SDK), it is not recommended to pin dependencies to specific versions, as this can lead to conflicts in projects that use the library (see [the renovate documentation](https://docs.renovatebot.com/dependency-pinning/#ranges-for-libraries) for details).

In our default configuration, we have dependency pinning enabled, because most of our repositories are applications and not libraries. Therefore, in library repositories, you should disable dependency pinning by adding `"rangeStrategy": "auto"` to the renovate configuration:

```json
{
    "$schema": "https://docs.renovatebot.com/renovate-schema.json",
    "extends": [
        "github>RubberDuckCrew/.github//configs/renovate/renovate-rubberduckcrew.json"
    ],
    "rangeStrategy": "auto"
}
```

:::

For more information and examples, see the [Renovate documentation](https://docs.renovatebot.com/).
