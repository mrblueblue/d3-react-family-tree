var gulp = require('gulp');
var run = require('gulp-run');
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
  return run("npm run test")
});

gulp.task('watch', function() {
  gulp.watch(['./src/*.js', './spec/*.js'], ['test']);
  gulp.watch(['./src/react-client/*/*.js*', './src/react-client/*'], ['test', 'build']);
});

gulp.task('default', ['watch', 'test']);
gulp.task('test', ['test']);
