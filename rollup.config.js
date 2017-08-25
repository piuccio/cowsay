import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import string from 'rollup-plugin-string';

export default {
  input: 'browser.js',
  plugins: [
    nodeResolve({
      module: true,
      jsnext: true,
    }),
    commonjs(),
    string({
      include: '**/*.cow',
    }),
  ],
  name: 'cowsay',
  output: [
    { file: 'build/cowsay.umd.js', format: 'umd' },
    { file: 'build/cowsay.es.js', format: 'es' },
  ]
}
