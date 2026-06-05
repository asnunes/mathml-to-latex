# AGENTS.md

Guidance for AI agents (and humans) working in this repository.

## What this project is

`mathml-to-latex` is a small, dependency-light TypeScript library that converts a
[MathML](https://en.wikipedia.org/wiki/MathML) string into a
[LaTeX](https://en.wikipedia.org/wiki/LaTeX) string. It is published to npm and
bundled with webpack.

The entire public API is a single static method:

```ts
import { MathMLToLaTeX } from 'mathml-to-latex';

MathMLToLaTeX.convert('<math><mrow><mn>a</mn><mo>+</mo><mn>b</mn></mrow></math>');
// => 'a + b'
```

`src/index.ts` exports **only** `MathMLToLaTeX`. Everything else is internal — do
not widen the public surface without a deliberate reason.

## Toolchain & commands

- **Node:** `24.16.0`, pinned in `.tool-versions` (managed via `mise`/`asdf`).
  Run commands through `mise exec node@24.16.0 -- <cmd>` if your shell default
  differs.
- **Install:** `npm ci`
- **Test:** `npm test` (Jest + ts-jest; runs against `src`, no build needed)
- **Test (watch / verbose):** `npm run test:watch`, `npm run test:verbose`
- **Build:** `npm run build` (webpack → `dist/bundle.min.js` + `dist/index.d.ts`)
- **Lint:** `npm run lint` (eslint + prettier, autofix)
- **CI:** `.github/workflows/test.yml` runs the Dockerized test suite
  (`make test-build && make test`) on every PR. Publishing
  (`.github/workflows/publish.yml`) only happens on a GitHub **Release** — pushes
  and merges never publish.

## Architecture

The code follows a layered (clean-architecture-ish) layout. Dependencies point
inward: `main` → `data`/`infra` → `domain`.

```
src/
  index.ts                     Public barrel (exports MathMLToLaTeX only)
  main/                        Composition root
    mathml-to-latex.ts         MathMLToLaTeX.convert — the public entry point
    factories/                 Wiring (makeToMathElementsConverter)
  domain/
    usecases/to-latex-converter.ts   ToLaTeXConverter interface (the core contract)
  data/
    protocols/                 MathMLElement (internal tree node), UTF8 interface
    usecases/mathml-to-latex-convertion/
      mathml-element-to-latex-converter-adapter.ts  Tag name → converter registry
      tree-to-latex.ts         Iterative post-order driver (tree → LaTeX)
      converters/              One converter per MathML tag (mfrac, msup, mrow, …)
    helpers/                   Wrappers, separators, whitespace, the memo helper
    errors/                    Domain errors (InvalidNumberOfChildrenError)
  infra/
    usecases/xmldom-to-mathml-elements/   XML/DOM parsing (xmldom) → MathMLElement
  syntax/                      Static lookup tables: unicode/glyph → LaTeX command
```

## The conversion pipeline

`MathMLToLaTeX.convert(mathml)` runs two stages:

1. **Parse → element tree** (`infra`): `XmlToMathMLAdapter` parses the string with
   `@xmldom/xmldom`, cleaning MS Word artefacts (line breaks, `mml:` prefixes) and
   recovering from malformed attributes via `ErrorHandler`.
   `ElementsToMathMLAdapter` then maps the DOM into the internal
   `MathMLElement` tree.
2. **Tree → LaTeX** (`data`): for each top-level `<math>` element,
   `convertTreeToLatex` walks the tree and produces LaTeX, dispatching each node
   to its converter via `MathMLElementToLatexConverterAdapter`. Results are joined
   and trimmed.

`MathMLElement` is parser-agnostic on purpose: the conversion logic never touches
DOM nodes, only this internal tree.

## Design decisions worth knowing

- **Everything is iterative, not recursive.** Both the DOM→tree build
  (`ElementsToMathMLAdapter`) and the tree→LaTeX evaluation (`tree-to-latex`) use
  explicit stacks so pathologically deep input cannot overflow the call stack
  (a DoS vector). `tree-to-latex` evaluates **post-order** and memoizes each
  node's LaTeX; the `mathMLElementToLaTeXConverter` helper returns a child's
  precomputed string while a memo is active, so the ~25 converters can stay
  written in their natural "combine my children's strings" style without ever
  recursing deeply. If you add a converter, this just works — keep combining
  children via the helper.
- **`mtable` inner-table flag is a pre-pass.** Nested `<mtable>`s must be wrapped
  in a `matrix` environment. Because evaluation is bottom-up but that flag is a
  top-down property, `tree-to-latex` sets the `innerTable` flag in a separate
  iterative top-down pass before evaluation. Don't move it back into a converter
  constructor.
- **Malformed-attribute recovery.** `ErrorHandler` repairs the value-less
  attributes MS Word emits (e.g. `close= >`). xmldom 0.9 reports some of these as
  a thrown `ParseError`, so `XmlToMathMLAdapter._parse` catches, lets the handler
  fix the XML, and re-parses.

## Adding a new MathML element converter

1. Create `src/data/usecases/mathml-to-latex-convertion/converters/<tag>.ts` with
   a class implementing `ToLaTeXConverter` (`convert(): string`). Combine child
   LaTeX via `mathMLElementToLaTeXConverter(child).convert()`.
2. Export it from `converters/index.ts`.
3. Register the tag in the `fromMathMLElementToLatexConverter` map in
   `mathml-element-to-latex-converter-adapter.ts`.
4. Add cases to `__tests__` (see below).
5. Throw `InvalidNumberOfChildrenError` for arity violations, matching the
   existing converters (`mfrac`, `msup`, …).

## Tests

- Located in `__tests__/`; run with `npm test` (Jest, ts-jest, `--runInBand`).
- `__tests__/index.test.ts` is the main integration suite (MathML string → LaTeX).
- `__tests__/security/robustness.test.ts` covers parser hardening (deep nesting,
  injection non-leakage).
- Tests import from `src` directly — no build step required to run them.

## Conventions

- **All code and comments in English**, even in non-English conversations.
- **File layout:** exported/public code first, then private and non-exported
  code; private methods go below public ones, and type/interface definitions go
  at the bottom of the file.
- **Prefer early returns** over deep `if` nesting.
- **Commits:** semantic style — `type(scope): short message` in English
  (`feat`, `fix`, `refactor`, `test`, `chore`, `docs`). Keep messages short.
- **Never `git add -A`/`git add .`** — stage specific files.
- **Do not commit or push unless explicitly asked**; each commit/push needs its
  own explicit go-ahead.
- Don't add runtime dependencies lightly — the library ships with only
  `@xmldom/xmldom`.
