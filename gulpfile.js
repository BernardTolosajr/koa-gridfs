var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

var mocha = require('gulp-mocha-co'),
      exit = require('gulp-exit');

gulp.task('test-once', function() {
  gulp.src(['test/*.js'])
    .pipe(mocha({
    reporter: 'nyan'
  }))
    .pipe(exit());
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    nodeArgs: ['--harmony']
  }).on('restart');
});

gulp.task('default', ['nodemon']);
