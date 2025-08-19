# Contributing conventions

To maintain a consistent and organized codebase, we have established the following conventions for contributing to our project. Please adhere to these guidelines when making contributions.

## Commit Messages

We use the [GitMoji](https://gitmoji.dev/) convention for commit messages. This helps us maintain clarity and consistency in our commit history. So a commit message in our Project consists of `<intention> [scope?][:?] <message>`

-   intention: The intention you want to express with the commit, using an emoji from the [list](https://gitmoji.dev/). Either in the :shortcode: or unicode format.

-   scope: An _**optional**_ string that adds contextual information for the scope of the change _**(which we do not use in this project)**_.

-   message: A brief explanation of the change.

Here are some examples for possible Commits:

-   `🐛 Fix error while user image is loading`
-   `✨ Add editing todos`
-   `📝 Update README with new installation instructions`

## Branch Naming

When creating branches for your contributions, please use one of the following prefixes to indicate the type of work being done. This helps in categorizing and understanding the purpose of each branch at a glance.

| Prefix      | Gitmoji | Description                                            | Example                       | Labels             |
| ----------- | ------- | ------------------------------------------------------ | ----------------------------- | ------------------ |
| `feature/`  | ✨      | Implementing a new feature or major functionality      | `feature/user-authentication` | ✨ Enhancement     |
| `fix/`      | 🐛      | Fixing a bug, issue, or regression                     | `fix/crash-on-startup`        | 🐛 Bug, 🚑️ Hotfix |
| `docs/`     | 📝      | Documentation updates or improvements                  | `docs/api-usage-guide`        | 📝 Documentation   |
| `test/`     | 🧪      | Adding or updating tests (unit, integration, etc.)     | `test/user-service-tests`     | 🧪 Testing         |
| `refactor/` | ♻️      | Code refactoring without changing existing behavior    | `refactor/database-layer`     | ♻️ Refactor        |
| `ui/`       | 💄      | User interface or experience improvements              | `ui/button-alignment`         | 💄 UI/UX           |
| `ci/`       | 👷      | CI/CD or automation pipeline changes                   | `ci/update-pipeline`          | 👷 CI/CD           |
| `config/`   | 🔧      | Configuration file changes or updates                  | `config/update-env-variables` | 🔧 Configuration   |
| `security/` | 🔒️     | Fixing or improving security-related functionality     | `security/fix-token-leak`     | 🔒️ Security       |
| `chore/`    | 🛠️      | General maintenance, dependency updates, tooling, etc. | `chore/improve-logging`       | 🛠️ Maintenance     |

## Labels

When creating pull requests and issues, please use the appropriate labels to categorize your changes. This helps maintainers quickly understand the nature of your contribution. The labels should match the prefixes used in branch naming.

| Label               | Description                                                           | Color   | Branch Prefix |
| ------------------- | --------------------------------------------------------------------- | ------- | ------------- |
| ✨ Enhancement      | New feature or request                                                | #eeff00 | `feature/`    |
| 🐛 Bug              | Something isn't working as intended                                   | #ff4545 | `fix/`        |
| ⚠️ Mistake          | Mistake that doesn't influence usability                              | #ff4545 | `fix/`        |
| 🚑️ Hotfix          | Critical or emergency fix                                             | #b60205 | `fix/`        |
| 🔒️ Security        | Address security vulnerabilities                                      | #b60205 | `security/`   |
| 📌 Dependencies     | External library or package updates                                   | #4da0ff | `chore/`      |
| 📝 Documentation    | Improvements or additions to documentation                            | #005999 | `docs/`       |
| ♻️ Refactor         | Code improvements without changing function                           | #009600 | `refactor/`   |
| 🧪 Testing          | Add or improve tests                                                  | #00ff15 | `test/`       |
| 💄 UI/UX            | Changes related to the user interface and experience                  | #ff2590 | `ui/`         |
| 👷 CI/CD            | Changes related to continuous integration/deployment                  | #00fff0 | `ci/`         |
| 🔧 Configuration    | Changes to configuration files or settings                            | #868686 | `config/`     |
| 🛠️ Maintenance      | General maintenance and updates                                       | #545454 | `chore/`      |
| ⚗️ Request Build    | Requests a build                                                      | #00ff9d | -             |
| 🧐 Size Analysis    | Request for size analysis of the APK (only alongside a build request) | #00a164 | -             |
| 💬 Discussion       | Open discussion or brainstorming                                      | #6f22ff | -             |
| ❓ Question         | Further information is requested                                      | #a16eff | -             |
| ❌ Wontfix          | This will not be worked on                                            | #ffffff | -             |
| 🔄 Duplicate        | This issue or pull request already exists                             | #bbbbbb | -             |
| 🚧 Work in Progress | This is not yet complete                                              | #ffa500 | -             |

> Note: The labels without a branch prefix are used for issues and pull requests that do not correspond to a specific branch type, such as discussions or questions.

The labels are defined globally in [`labels.yml`](https://github.com/RubberDuckCrew/.github/blob/main/configs/conventions/labels.yml) in the `.github` repository and are synchronized across all repositories using a GitHub Actions workflow. See [Sync labels](/development/ci-cd#sync-labels) for more details.
