var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine');
var webpack = require('gulp-webpack');

gulp.task('build', function() {
  return gulp.src('./src/react-client/app.js')
    .pipe(
      webpack({
        output: {
          filename: 'bundle.js'
        },
        module: {
          loaders: [
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loaders: ['jsx-loader?insertPragma=React.DOM&harmony', 'babel']
            }
          ]
        },
        externals: {
          'react': 'React'
        },
        resolve: {
          extensions: ['', '.js', '.jsx']
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

gulp.task('es5lint', function () {
  return gulp.src(['./src/*.js', './spec/*.js'])
    .pipe(eslint({
      rules: {
        'no-undef': false, 
        'modules': true, 
        'quotes': [1, 'single'], 
        'global-strict': false,
        'no-use-before-define': false,
        'no-console': false,
        'no-process-exit': false
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('es6lint', function(){
  return gulp.src(['./src/react-client/*/*.js*', './src/react-client/*'])
    .pipe(eslint({
      globals: {
      'require': true
      },
      envs: {
        browser: true,
        es6: true
      },
      rules: {
        'quotes': [2, 'single', 'avoid-escape'],
        'global-strict': false,
        'no-use-before-define': false
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
})

gulp.task('watch', function() {
  gulp.watch(['./src/*.js', './spec/*.js'], ['test', 'es5lint']);
  gulp.watch(['./src/react-client/*/*.js*', './src/react-client/*'], ['test', 'es6lint', 'build']);
});

gulp.task('lint', ['es5lint', 'es6lint']);
gulp.task('default', ['watch', 'lint', 'test']);
gulp.task('test-lint', ['lint', 'test']);

