const { src, dest, series, watch } = require('gulp');
const postcss = require('gulp-postcss');
const { combineConfigSync } = require('@gera2ld/plaid/util');

const { plugins, ...rest } = combineConfigSync({}, [require('@gera2ld/plaid/postcss/base')]);

async function clean() {
  const { deleteAsync } = await import('del');
  return deleteAsync(['lib']);
}

function copy() {
  return src(['src/**/*', '!**/*.css']).pipe(dest('lib'));
}

async function postinstall() {
  const { execa } = await import('execa');
  await execa('node', ['scripts/postinstall.mjs']);
}

function css() {
  return src('src/**/*.css').pipe(postcss(plugins, rest)).pipe(dest('lib'));
}

function dev() {
  watch('src/**/*.css', css);
  watch(['src/**/*', '!**/*.css'], compile);
}

const compile = series(copy, postinstall);

exports.clean = clean;
exports.copy = copy;
exports.css = css;
exports.build = series(clean, [copy, css]);
exports.watch = series([compile, css], dev);
