const fs = require('fs').promises;
const util = require('util');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const vue = require('rollup-plugin-vue');
const postcss = require('rollup-plugin-postcss');

build();

async function build() {
  const items = await fs.readdir('src');
  return Promise.all(items.map(buildComponent));
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
      esm: 'es',
    }[format];
    const rollupOptions = {
      input: {
        input,
        plugins: [
          vue({
            css: false,
            style: {
              postcssCleanOptions: { disabled: true },
              postcssOptions: {
                parser: require('postcss-scss'),
              },
              postcssPlugins: [
                require('precss'),
                require('postcss-color-function'),
                require('postcss-calc'),
              ],
            },
          }),
          postcss({
            extract: `${dir}/${name}/style.css`,
          }),
          babel({
            exclude: 'node_modules/**',
          }),
        ],
        external: [
          'codemirror',
          'vue',
        ],
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
    await fs.writeFile(`lib/${name}/style.js`, `require('./style.css');`, 'utf8');
    await fs.writeFile(`lib/${name}/bundle.js`, `\
module.exports = require('./index');
require('./style');
`, 'utf8');
  }
  {
    const rollupOptions = getOptions('esm');
    const bundle = await rollup.rollup(rollupOptions.input);
    await bundle.write(rollupOptions.output);
    await fs.writeFile(`es/${name}/style.js`, `import './style.css';`, 'utf8');
    await fs.writeFile(`es/${name}/bundle.js`, `\
import ${name} from './index';
import './style';

export default ${name};
`, 'utf8');
  }
}
