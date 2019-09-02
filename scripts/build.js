const fs = require('fs').promises;
const rollup = require('rollup');
const vue = require('rollup-plugin-vue');
const postcss = require('rollup-plugin-postcss');
const { getRollupPlugins, getExternal, DIST } = require('./util');

const external = getExternal([
  'codemirror',
  'vue',
]);

build();

async function build() {
  const items = await fs.readdir('src');
  await Promise.all(items.filter(name => !name.startsWith('.')).map(buildComponent));
}

async function fileExists(file) {
  try {
    const stat = await fs.stat(file);
    return stat.isFile();
  } catch (err) {
    return false;
  }
}

async function buildComponent(name) {
  let input;
  for (let ext of ['js', 'vue']) {
    const tryInput = `src/${name}/index.${ext}`;
    try {
      await fs.stat(tryInput);
    } catch (err) {
      continue;
    }
    input = tryInput;
    break;
  }
  if (!input) throw new Error(`Cannot find component: ${name}`);
  const getOptions = format => {
    const dir = {
      cjs: 'lib',
    }[format];
    const rollupOptions = {
      input: {
        input,
        plugins: [
          ...getRollupPlugins(),
          vue({
            css: false,
            style: {
              postcssCleanOptions: { disabled: true },
            },
          }),
          postcss({
            extract: `${dir}/${name}/style.css`,
          }),
        ],
        external,
      },
      output: {
        file: `${dir}/${name}/index.js`,
        format,
      },
    };
    return rollupOptions;
  };
  {
    const rollupOptions = getOptions('cjs');
    const bundle = await rollup.rollup(rollupOptions.input);
    await bundle.write(rollupOptions.output);
    const styleJs = await fileExists(`lib/${name}/style.css`) ? `require('./style.css');` : '';
    await fs.writeFile(`lib/${name}/style.js`, styleJs, 'utf8');
    await fs.writeFile(`lib/${name}/bundle.js`, `\
module.exports = require('./index');
require('./style');
`, 'utf8');
  }
}
