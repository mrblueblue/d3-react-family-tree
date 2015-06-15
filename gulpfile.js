var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine');
var webpack = require('gulp-webpack');

gulp.task('build', function() {
  return gulp.src('./src/www/tree-visualization.js')
    .pipe(
      webpack({
        output: {
          path: __dirname,
          filename: 'bundle.js'
        }
      }))
    .pipe(gulp.dest('./src/www/'));
});
 
gulp.task('test', function () {
  return gulp.src('./spec/FamilyTreeSpec.js')
    .pipe(jasmine({
      verbose: true, 
      includeStackTrace: true,
      timeout: 8000
    }));
});

gulp.task('lint', function () {
  return gulp.src(['./src/*.js', './spec/*.js', './src/www/tree-visualization.js'])
    .pipe(eslint({
      rules: {
        'no-undef': false, 
        'modules': true, 
        'quotes': [1, 'single'], 
        'global-strict': false,
        'no-use-before-define': false
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('watch', function() {
  gulp.watch(['./src/*.js', './spec/*.js'], ['test', 'lint']);
  gulp.watch('./src/www/tree-visualization.js', ['build', 'lint'])
});

gulp.task('default', ['watch', 'lint', 'test']);
