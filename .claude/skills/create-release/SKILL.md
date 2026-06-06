---
name: create-release
description: Cut and publish a new GitHub Release of mathml-to-latex, which triggers the automated npm publish. Use when the user asks to create a release, publish to npm, ship a version, or "release vX.Y.Z". Requires the version bump to be merged to main first (see the version-bump skill); this skill writes the release notes in the project's house style and creates the GitHub Release that fires the publish workflow.
---

# Create a release

> **Bump first, always.** A release is never just a tag. The version in `package.json` on `main` MUST already equal the version you are releasing, merged via its own PR, BEFORE you create the release. Never release a version that isn't on `main` yet: the publish workflow would push whatever version `main` currently has to npm, not the one you intended. If the bump isn't merged, stop and run the **version-bump** skill first.

How releasing works in this repo: there is **no manual `npm publish`**. Publishing is driven by GitHub Releases. `.github/workflows/publish.yml` runs on `release: published` (and `workflow_dispatch`), then builds, tests, and runs `npm publish --access public` via **Trusted Publishing (OIDC)**, with no npm token stored in the repo. So the full sequence is always:

1. **Bump** `package.json` to `X.Y.Z` in a PR and merge it to `main` (version-bump skill).
2. **Release** by creating a GitHub Release whose tag is `vX.Y.Z`, targeting `main`.
3. The release event publishes `X.Y.Z` to npm automatically.

Skipping step 1 means whatever version is currently on `main` gets published, not the one you intended.

## 0. Precondition: the version bump must already be merged

The release tag must point at a commit on `main` where `package.json` already has the target version. This is non-negotiable. Confirm before anything else:

```bash
git fetch origin --quiet
git show origin/main:package.json | grep '"version"'   # must equal the version you're releasing
```

If it doesn't match, stop and do the bump PR first via the **version-bump** skill.

## 1. Gather what changed since the last release

```bash
LAST=$(git tag --sort=-creatordate | head -1)
git log --oneline "$LAST"..origin/main
gh pr list --state merged --base main --limit 30 --json number,title,url | head
```

Map each user-facing change to its PR number and, when known, the issue/reporter to credit. Skip pure `refactor`/`test`/`style`/`chore` and the version-bump PR itself: release notes are for users, not internal churn.

## 2. Write the release notes in the house style

Past releases (`gh release view v1.6.0`, `v1.5.0`) follow a consistent format. Match it:

- One bullet per change, newest/most important first.
- Prefix each with a **category in caps**: `(SECURITY)`, `(FEAT)`, `(FIX)`. Security first, then feat, then fix.
- Include the PR number (`#57`) and/or issue number (`[#44]`).
- Bold a short headline, then a sentence or two of plain-language detail.
- Credit reporters/contributors: `_Thanks to @user for reporting._`
- For security fixes, link the relevant GHSA advisories.

Example shape:

```markdown
- **(FEAT) Pair bare fences into `mfenced`**
  Vertical bars, double bars, and loose `mo` fences are now paired into proper delimiters, producing correct `\left...\right` and norm output. #68 #69

- **(FIX) Valid LaTeX for brace fences**
  Brace delimiters are now escaped. #67
```

Write the notes to a temp file (`/tmp/release-notes.md`) so the markdown survives the shell.

## 3. Create the release (this publishes to npm)

The tag is created by the release itself, targeting `main`. Tag format is `vX.Y.Z`.

```bash
gh release create v<VERSION> \
  --target main \
  --title "v<VERSION>" \
  --notes-file /tmp/release-notes.md \
  --latest
```

Creating this release emits `release: published`, which triggers `publish.yml`.

## 4. Watch the publish workflow

```bash
gh run list --workflow=publish.yml --limit 1
gh run watch <run-id>   # or: gh run view <run-id> --log-failed
```

It runs install, `npm test`, `npm run build`, then `npm publish`. If tests or build fail, the publish does not happen; fix forward (a new bump plus release) rather than reusing the tag. Confirm the new version is live:

```bash
npm view mathml-to-latex version
```

## Notes

- Do not create the tag manually with `git tag`; let `gh release create` own it so the publish event fires.
- `workflow_dispatch` on `publish.yml` can re-run a publish manually from the Actions tab if a release was made but the run failed transiently, but prefer cutting a clean patch release.
- The user must approve the release before you create it: it is a public, externally-visible action that publishes to npm.
