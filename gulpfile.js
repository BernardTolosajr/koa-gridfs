var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

var mocha = require('gulp-mocha-co'),
      exit = require('gulp-exit');

gulp.task('watch', function() {
  gulp.watch(
    ['src/controllers/*.js',
     'src/models/*.js',
     'config/*.js',
     '*.js',
     'test/*.js'], //blurbs of files to watch
    ['mocha'] //tasks to run when the above files change
  );
});

gulp.task('mocha', function() {
  process.env.PORT = 8001;
  return gulp.src(['test/*.js'])
    .pipe(mocha({
    reporter: 'nyan'
  }))
});

gulp.task('test-once', function() {
  gulp.tasks.mocha.fn().pipe(exit());
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    env: {PORT: 8000},
    nodeArgs: ['--harmony']
  }).on('restart');
});

gulp.task('default', ['nodemon', 'mocha', 'watch']);
