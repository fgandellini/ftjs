var gulp = require('gulp');
var mocha = require('gulp-mocha');

var files = '*.js';
var libs = 'lib/**/*.js';
var tests = 'test/**/*.js';

gulp.task('test', function(done) {
  return gulp.src([files, libs, tests])
    .pipe(mocha({
      reporter: 'spec'
    }));
});

gulp.task('watch', function(done) {
  return gulp.watch([files, libs, tests], ['test']);
});

gulp.task('default', ['watch']);