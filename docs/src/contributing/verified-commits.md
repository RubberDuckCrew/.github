# Verified commits

To maintain the integrity and security of our codebase, we require **all commits** to be **verified**. This ensures that the code originates from a trusted source and hasn't been tampered with.

## Why verified commits?

-   Security: Verifies the authenticity of the commit's author, preventing unauthorized changes.
-   Trust: Increases confidence in the codebase by confirming who made specific changes.
-   Traceability: Provides a clear and auditable history of contributions.

## How to set up verified commits

You can verify your commits by signing them with a GPG key. If you haven't set this up yet, it's a straightforward process:

1. **Generate a GPG Key (if you don't have one)**: You'll need to create a new GPG key. When doing so, ensure the email address associated with the GPG key matches the primary email address linked to your GitHub account.

2. **Add your GPG Key to GitHub**: Once you have your GPG key, you'll need to add it to your GitHub profile. This tells GitHub to trust commits signed with that key.

3. **Configure Git to Sign Commits**: Finally, you'll configure your local Git installation to automatically sign your commits with your GPG key.

## Additional Resources

GitHub provides an excellent, comprehensive guide on setting up verified commits:

-   [Generate GPG Key](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)
-   [Add GPG to Github](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account)
-   [Signing commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits)

This guide will walk you through generating a GPG key, adding it to your GitHub account, and configuring Git to sign your commits automatically.
