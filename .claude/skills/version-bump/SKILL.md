---
name: version-bump
description: Bump the package version correctly for a release of mathml-to-latex. Use when the user asks to bump the version, cut a release, prepare a release PR, or asks "what version should we publish". Decides the semver level from the commits since the last tag, bumps via npm, and opens a release PR.
---

# Version bump

How to bump `mathml-to-latex` to a new version and open the release PR. Publishing itself is automated: it runs on a **GitHub Release published** event (`.github/workflows/publish.yml`, Trusted Publishing via OIDC). This skill only covers the version bump + PR; the actual npm publish happens later when a GitHub Release is created from the merged tag.

## 1. Decide the semver level

List everything since the last release and classify it:

```bash
git fetch origin --quiet
LAST=$(git tag --sort=-creatordate | head -1)
git log --oneline "$LAST"..origin/main
```

Pick the level from the highest-impact commit:

- **MAJOR** (`x.0.0`): any breaking change to the public API (the `MathMLToLaTeX` signature / exported surface). Rare here.
- **MINOR** (`1.x.0`): at least one `feat(...)` commit, i.e. a new conversion capability, even if the rest are fixes/refactors.
- **PATCH** (`1.6.x`): only `fix(...)` commits (and non-user-facing `refactor`/`test`/`style`/`chore`). No `feat`.

Note: changing the generated LaTeX for some inputs is **not** a breaking change by itself; the public API is what counts. New `feat` always beats fixes when choosing the level.

## 2. Smoke-test the real package before bumping

Before touching the version, prove the built artifact actually works when consumed like a real npm install. This catches broken `exports` maps, missing `dist` files, stray files leaking into the tarball, and changes that didn't make it into the build. Do it from a clean tree on the latest `main`.

```bash
# 1. Build and pack exactly what would be published (publish.yml runs `npm run build` then publish)
npm run build
npm pack --pack-destination /tmp

# 2. Inspect the tarball contents: only dist/, README, LICENSE, package.json should ship.
#    Anything else (e.g. .claude/, src/, test files) is a packaging leak to fix first.
tar -tzf /tmp/mathml-to-latex-*.tgz

# 3. Install the tarball into a throwaway project, NOT a workspace link.
#    Use a fresh dir AND bypass the cache: repacking the SAME version reuses the
#    old tarball name, so npm can resolve a stale cached copy and you'd validate
#    the previous package. --no-cache (or `npm cache clean --force`) forces a re-extract.
rm -rf /tmp/mtl-smoke && mkdir -p /tmp/mtl-smoke && cd /tmp/mtl-smoke && npm init -y >/dev/null
npm install --no-cache /tmp/mathml-to-latex-*.tgz
```

The authoritative check for what ships is `tar -tzf` on the tarball itself (step 2), which never touches the cache. The install is to validate runtime behavior; keep it cache-free so a re-pack of the same version can't pass on stale bits.

Then validate, in that separate project:

- **README usage works in both module systems.** Run the README's own examples via `import { MathMLToLaTeX } from 'mathml-to-latex'` (`.mjs`) and `require('mathml-to-latex')` (`.cjs`), asserting the documented outputs (`a + b`, the `bmatrix` matrix, `2 + 2 = 4`).
- **Types resolve.** A tiny `.ts` file importing the package should type-check (`npx tsc --noEmit --moduleResolution bundler ...`) with `convert()` typed as `string`.
- **Every change since the last tag is present.** For each `feat`/`fix` since `$LAST`, pull the expected LaTeX from its test (`git show <commit> -- '*.test.ts'`) and assert the installed package produces it. This confirms the build carries the fixes, not just that it loads.

Only proceed to the bump once this passes. If the tarball leaks files or a change is missing, fix that first (separate PR/commit) and do not release a broken package.

## 3. Branch off the latest main

```bash
git fetch origin --quiet
git checkout -b chore/bump-version-<VERSION> origin/main
```

## 4. Bump via npm (never hand-edit the lockfile graph)

```bash
npm version --no-git-tag-version <VERSION>
```

This updates the root `version` in both `package.json` and `package-lock.json` consistently. `--no-git-tag-version` stops npm from creating its own commit/tag, since the tag is created later by the GitHub Release.

Editing `package.json`'s `version` by hand and copying it into the two root `version` fields of `package-lock.json` produces the identical result and is safe, but `npm version` is preferred: it guarantees the two files stay in sync and never risks touching a dependency entry that happens to share the version string. Verify the diff is exactly 3 lines:

```bash
git diff --stat   # package.json | 2 +-   package-lock.json | 4 ++--
```

## 5. Commit, push, open the PR

Commit message follows the project's semantic style (see `~/.claude/CLAUDE.md`):

```bash
git add package.json package-lock.json
git commit -m "chore(release): bump version to <VERSION>"
git push -u origin chore/bump-version-<VERSION>
gh pr create --base main --title "chore(release): bump version to <VERSION>" --body "<short summary>"
```

Keep the PR body short: a one-line summary plus the feat/fix highlights since the last release. No long descriptions, no test/todo sections (per user PR conventions). Do not add the version tag yourself.

## 6. After merge: cut the release

Once this bump PR is merged, use the **create-release** skill to publish. It creates a GitHub Release with tag `v<VERSION>` from main, and that `release: published` event triggers `publish.yml`, which builds, tests, and runs `npm publish` via Trusted Publishing. The bump must be on `main` before the release is created.
