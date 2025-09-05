# Contributing with Forks

Thank you for your interest in contributing to our project. To maintain a secure and organized workflow, please follow the guidelines below when working with forks.

## Workflow

1. **Fork the repository**  
   Start by creating a fork of the main repository using the "Fork" button on GitHub.

2. **Create a feature branch**  
   In your fork, create a new branch for your changes.  
   **Do not use or merge changes into the `main` branch of your fork.**  
   Please make sure to follow our established branch naming conventions (see project guidelines).

3. **Make your changes**  
   Develop your feature or fix in your feature branch. Ensure that your code follows the project's coding standards.

4. **Push your changes**  
   Push your feature branch to your forked repository on GitHub.

5. **Open a pull request**  
   Open a pull request (PR) from your feature branch into the `main` branch of the main repository.

## CI Builds

Due to security restrictions, GitHub Actions (CI builds) **cannot be fully executed on forks**.

While pull requests from forks can still run limited tests (such as unit tests or lint checks), they **do not have access to the secrets required to build APKs or App Bundles**.  
This means that any build steps involving signing keys or deployment credentials will be skipped automatically for security reasons.

## Keynotes

-   Create a fork of `main` and create your branch
-   Make sure to follow the [branch naming conventions](/contributing/conventions#branch-naming).
-   **DO NOT** create pull requests from the `main` branch of your fork!
-   Keep pull requests focused and limited to a single topic or fix.
-   If you’re unsure about anything, feel free to ask or open a draft PR for early feedback.
