(function() {
  'use strict';
 
  var gulp     = require('gulp'),
    nodemon    = require('gulp-nodemon'),
    watch      = require('gulp-watch'),
    jshint     = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    maps       = require('gulp-sourcemaps'),
    _paths     = ['server/**/*.js', 'client/js/*.js'];


  gulp.task('concatScripts', function() {
    return gulp.src([
      // 'client/lib/**/*.min.js',
      'client/js/**/*.js'
    ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('client'));
  })
 
 
  //register nodemon task
  gulp.task('nodemon', function() {
    nodemon({
      script: 'server/app.js',
      env: {
        'NODE_ENV': 'development'
      }
    })
      .on('restart');
  });
 
  // Rerun the task when a file changes
  gulp.task('watch', function() {
    livereload.listen();
    gulp.src(_paths, {
      read: false
    })
      .pipe(watch({
        emit: 'all'
      }))
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
    watch(_paths, livereload.changed);
  });
 
  //lint js files
  gulp.task('lint', function() {
    gulp.src(_paths)
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  });
 
 
  // The default task (called when you run `gulp` from cli)
  gulp.task('default', ['lint', 'nodemon', 'watch']);
 
}());