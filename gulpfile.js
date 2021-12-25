const { src, dest, series, watch } = require('gulp');
const del = require('del');
const postcss = require('gulp-postcss');
const { combineConfigSync } = require('@gera2ld/plaid/util');

const { plugins, ...rest } = combineConfigSync({}, [require('@gera2ld/plaid/postcss/base')]);

function clean() {
  return del(['lib']);
}

function copy() {
  return src(['src/**/*', '!**/*.css']).pipe(dest('lib'));
}

function css() {
  return src('src/**/*.css').pipe(postcss(plugins, rest)).pipe(dest('lib'));
}

function watchCss() {
  watch('src/**/*.css', css);
}

exports.clean = clean;
exports.copy = copy;
exports.css = css;
exports.build = series(clean, [copy, css]);
exports.watch = series([copy, css], watchCss);
