import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'main.js',  // Entry point for the application
  output: [
  {
    file: 'dist/interval-bins.mjs', // Output bundle location
    format: 'esm'
  },
  {
    file: 'dist/interval-bins.cjs', // Output bundle location
    format: 'cjs' // CommonJS format suitable for Node.js require()
  }
  ],
  plugins: [
    resolve({
      preferBuiltins: true // Prefer Node.js built-ins over npm modules if available
    }),
    commonjs(),
    json()
  ],
  // List of Node built-in modules to leave as external dependencies
  // external: []
};
