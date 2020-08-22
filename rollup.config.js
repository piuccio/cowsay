import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {string} from 'rollup-plugin-string';

export default {
  input: 'browser.js',
  plugins: [
    nodeResolve(),
    commonjs(),
    string({
      include: '**/*.cow',
    }),
  ],
  output: [
    { file: 'build/cowsay.umd.js', format: 'umd', name: 'cowsay' },
    { file: 'build/cowsay.es.js', format: 'es' },
  ],
}
