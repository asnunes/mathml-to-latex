import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import { dts } from 'rollup-plugin-dts';

const input = 'src/index.ts';

// Emit ES modules for Rollup to consume without touching the shared tsconfig
// (ts-jest relies on `module: commonjs`). Declarations come from the dts pass.
const ts = () =>
  typescript({
    tsconfig: './tsconfig.json',
    module: 'esnext',
    moduleResolution: 'bundler',
    declaration: false,
    declarationMap: false,
  });

export default [
  // ESM + CJS for Node and bundlers — keep the dependency external.
  {
    input,
    external: ['@xmldom/xmldom'],
    plugins: [ts()],
    output: [
      { file: 'dist/index.mjs', format: 'es' },
      { file: 'dist/index.cjs', format: 'cjs', exports: 'named' },
    ],
  },
  // Self-contained, minified UMD for the browser/CDN — bundles the dependency
  // and exposes the same `MathMLToLaTeX` global as before.
  {
    input,
    plugins: [resolve(), commonjs(), ts(), terser()],
    output: {
      file: 'dist/bundle.min.js',
      format: 'umd',
      name: 'MathMLToLaTeX',
      exports: 'named',
    },
  },
  // Bundled type declarations.
  {
    input,
    plugins: [dts()],
    output: { file: 'dist/index.d.ts', format: 'es' },
  },
];
