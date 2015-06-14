var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine');
 
gulp.task('test', function () {
  return gulp.src('./spec/FamilyTreeSpec.js')
    .pipe(jasmine({
      verbose: true, 
      includeStackTrace: true
    }));
});

gulp.task('lint', function () {
  return gulp.src(['./src/*.js', './spec/*.js'])
    .pipe(eslint({
      rules: {
        'no-undef': false, 
        'modules': true, 
        'quotes': [1, 'single'], 
        'global-strict': false
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('watch', function() {
  gulp.watch(['./src/*.js', './spec/*.js'], ['test', 'lint']);
});

gulp.task('default', ['test', 'watch']);
