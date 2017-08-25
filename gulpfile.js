const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const through = require('through2');
const webpack = require('webpack');
const webpackConfig = require('./scripts/webpack.conf');

gulp.task('js', cb => {
  webpack(webpackConfig, (...args) => {
    webpackCallback(...args);
    cb();
  });
});

gulp.task('entry', ['js'], () => {
  return gulp.src('lib/*/component.js', { base: 'src' })
  .pipe(through.obj((file, enc, cb) => {
    const dirname = path.dirname(file.relative);
    const esm = new gutil.File({
      base: '',
      path: `${dirname}/index.js`,
      contents: new Buffer(`\
require('./style.css');
module.exports = require('./component');
`),
    });
    cb(null, esm);
  }))
  .pipe(gulp.dest('lib'));
});

gulp.task('build', ['entry']);

function webpackCallback(err, stats) {
  if (err) {
    gutil.log('[FATAL]', err);
    return;
  }
  if (stats.hasErrors()) {
    gutil.log('[ERROR] webpack compilation failed\n', stats.toJson().errors.join('\n'));
    return;
  }
  if (stats.hasWarnings()) {
    gutil.log('[WARNING] webpack compilation has warnings\n', stats.toJson().warnings.join('\n'));
  }
  (Array.isArray(stats.stats) ? stats.stats : [stats])
  .forEach(stat => {
    const timeCost = (stat.endTime - stat.startTime) / 1000;
    const chunks = Object.keys(stat.compilation.namedChunks).join(' ');
    gutil.log(`Webpack built: [${timeCost.toFixed(3)}s] ${chunks}`);
  });
}
