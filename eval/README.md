# mathml-to-latex eval

Visual playground for inspecting conversions side by side. It imports the library straight from `../src`, so whatever branch or uncommitted change is in the working tree is what gets evaluated.

This package is internal tooling: it is not published to npm (the root package ships `dist/` only) and its dependencies stay isolated from the library's.

## Run

```bash
cd eval
npm install
npm run dev
```

Then open the printed URL (default `http://localhost:5173`).

## Modes

- **MathML → LaTeX** (default): paste MathML on the left; the converted LaTeX, its KaTeX validity verdict and both renderings appear live. Both sides render with the same MathJax engine (mml input vs tex input), so a visual difference means a conversion difference, not a renderer difference.
- **Free LaTeX**: paste arbitrary LaTeX and see it rendered, to check a rendering hypothesis without going through the converter.

The KaTeX verdict matters because MathJax is forgiving: KaTeX's strict parser is what flags output that would not compile in real LaTeX (double subscripts, unbalanced `\left`/`\right`, etc.).

## Permalinks

The current mode and input are encoded in the URL hash. Copy the URL to share an exact reproduction in an issue or PR.

## Planned increments

- `/gallery`: every fixture of the regression corpus rendered on a single page.
- Fixture corpus + a browser-free jest test (convert each fixture, assert KaTeX accepts the result).
- Optional batch mode (Playwright screenshots + visual diff ranking) if automated visual regression in CI becomes worth the cost; the gallery page is the surface it would capture.
