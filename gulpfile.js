var gulp = require('gulp');
var mocha = require('gulp-mocha');

var files = '*.js';
var libs = 'lib/**/*.js';
var tests = 'test/**/*.js';

gulp.task('test', function(done) {
  gulp.src([files, libs, tests])
    .pipe(mocha({
      reporter: 'spec'
    }));
  done();
});

gulp.task('watch', function(done) {
  gulp.watch([files, libs, tests], ['test']);
  done();
});

gulp.task('default', ['watch']);