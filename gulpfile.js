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

gulp.task('esm', ['js'], () => {
  const items = [];
  return gulp.src('lib/*/index.js', { base: 'src' })
  .pipe(through.obj((file, enc, cb) => {
    const dirname = path.basename(path.dirname(file.relative));
    const name = dirname.replace(/(?:^|-)(.)/, (m, g) => g.toUpperCase());
    items.push([dirname, name]);
    const esm = new gutil.File({
      base: '',
      path: path.join(path.dirname(file.relative), 'index.esm.js'),
      contents: new Buffer(`\
import './index.css';
export default from './index.js';
`),
    });
    cb(null, esm);
  }, function (cb) {
    const esm = new gutil.File({
      base: '',
      path: 'index.esm.js',
      contents: new Buffer(items.map(([dirname, name]) => `export ${name} from './${dirname}/index.esm.js';`).join('\n')),
    });
    this.push(esm);
    cb();
  }))
  .pipe(gulp.dest('lib'));
});

gulp.task('build', ['js', 'esm']);

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
