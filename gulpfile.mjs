import gulp from 'gulp';
import postcss from 'gulp-postcss';

export async function clean() {
  const { deleteAsync } = await import('del');
  return deleteAsync(['lib']);
}

export function copy() {
  return gulp.src(['src/**/*', '!**/*.css']).pipe(gulp.dest('lib'));
}

async function postinstall() {
  const { execa } = await import('execa');
  await execa('node', ['scripts/postinstall.mjs']);
}

export function css() {
  return gulp.src('src/**/*.css').pipe(postcss()).pipe(gulp.dest('lib'));
}

function watch() {
  gulp.watch('src/**/*.css', css);
  gulp.watch(['src/**/*', '!**/*.css'], compile);
}

const compile = gulp.series(copy, postinstall);

export const build = gulp.series(clean, [copy, css]);
export const dev = gulp.series([compile, css], watch);
