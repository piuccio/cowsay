import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import string from 'rollup-plugin-string';

export default {
  entry: 'browser.js',
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
  moduleName: 'cowsay',
  targets: [
    { dest: 'build/cowsay.umd.js', format: 'umd' },
    { dest: 'build/cowsay.es.js', format: 'es' },
  ]
}
