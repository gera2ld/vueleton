const fs = require('fs').promises;
const vue = require('rollup-plugin-vue');
const { getRollupPlugins, getRollupExternal } = require('@gera2ld/plaid');

const external = getRollupExternal([
  '@babel/runtime',
  'codemirror',
  'vue',
]);
const postcssOptions = {
  ...require('@gera2ld/plaid/config/postcssrc'),
  extract: 'style.css',
};

module.exports = buildOptions();

async function buildOptions() {
  let items = await fs.readdir('src');
  items = items.filter(name => !name.startsWith('.'));
  const options = await Promise.all(items.map(buildComponent));
  return options.map(({ input, output }) => ({
    ...input,
    output,
  }));
}

function bundlePlugin() {
  return {
    name: 'bundlePlugin',
    generateBundle() {
      const ids = Array.from(this.getModuleIds());
      const hasCss = ids.some(id => id.endsWith('.css'));
      this.emitFile({
        type: 'asset',
        fileName: 'style.js',
        source: hasCss ? `require('./style.css');` : '',
      });
      this.emitFile({
        type: 'asset',
        fileName: 'bundle.js',
        source: `\
module.exports = require('./index');
require('./style');`,
      });
    },
  };
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
  return {
    input: {
      input,
      plugins: [
        vue({
          css: false,
          style: {
            postcssCleanOptions: { disabled: true },
          },
        }),
        ...getRollupPlugins({
          postcss: postcssOptions,
        }),
        bundlePlugin(),
      ],
      external,
    },
    output: {
      file: `lib/${name}/index.js`,
      format: 'cjs',
      exports: 'auto',
    },
  };
}
