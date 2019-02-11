const fs = require('fs').promises;
const util = require('util');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const vue = require('rollup-plugin-vue');
const postcss = require('rollup-plugin-postcss');

build();

async function build() {
  const items = await fs.readdir('src');
  await Promise.all(items.map(buildComponent));
}

function camelize(name) {
  return name.replace(/(?:^|-)(\w)/, (m, g) => g.toUpperCase());
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
            runtimeHelpers: true,
          }),
        ],
        external: id => id.startsWith('@babel/runtime/') || [
          'codemirror',
          'vue',
        ].includes(id),
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
  {
    const rollupOptions = getOptions('esm');
    const bundle = await rollup.rollup(rollupOptions.input);
    await bundle.write(rollupOptions.output);
    const styleJs = await fileExists(`es/${name}/style.css`) ? `import './style.css';` : '';
    await fs.writeFile(`es/${name}/style.js`, styleJs, 'utf8');
    const camelizedName = camelize(name);
    await fs.writeFile(`es/${name}/bundle.js`, `\
import ${camelizedName} from './index';
import './style';

export default ${camelizedName};
`, 'utf8');
  }
}
