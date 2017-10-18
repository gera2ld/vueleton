const fs = require('fs');
const util = require('util');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const vue = require('rollup-plugin-vue');

const writeFileAsync = util.promisify(fs.writeFile);
const statAsync = util.promisify(fs.stat);

[
  'Code',
  'Dropdown',
  'Modal',
].forEach(buildComponent);

async function buildComponent(name) {
  const lname = name.replace(/(.)([A-Z])/g, (m, g1, g2) => `${g1}-${g2}`).toLowerCase();
  let input;
  for (let ext of ['js', 'vue']) {
    const tryInput = `src/${lname}/index.${ext}`;
    try {
      await statAsync(tryInput);
    } catch (err) {
      continue;
    }
    input = tryInput;
    break;
  }
  if (!input) throw new Error(`Cannot find component: ${name}`);
  const rollupOptions = {
    input,
    file: `lib/${lname}/component.js`,
    format: 'cjs',
    plugins: [
      vue({
        css: `lib/${lname}/style.css`,
      }),
      babel({
        presets: [
          ['env', {
            modules: false,
          }],
        ],
        plugins: [
          'external-helpers',
        ],
        ignore: 'node_modules/**',
      }),
    ],
    external: [
      'codemirror',
      'vue',
    ],
  };
  const bundle = await rollup.rollup(rollupOptions);
  await bundle.write(rollupOptions);
  await writeFileAsync(`lib/${lname}/index.js`, `\
module.exports = require('./component');
require('./style.css');
`);
}
