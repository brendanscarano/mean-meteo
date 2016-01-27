'use strict';

import gulp           from 'gulp';
import nodemon        from 'gulp-nodemon';
import watch          from 'gulp-watch';
import jshint         from 'gulp-jshint';
import livereload     from 'gulp-livereload';
import concat         from 'gulp-concat';
import uglify         from 'gulp-uglify';
import sass           from 'gulp-sass';
import rename         from 'gulp-rename';
import maps           from 'gulp-sourcemaps';
import del            from 'del';
import babelify       from 'babelify';
import glob           from 'glob';
import templateCache  from 'gulp-angular-templatecache';
import browserify     from 'browserify';
import buffer         from 'vinyl-buffer'
import source         from 'vinyl-source-stream';
const _paths          = ['server/**/*.js', 'client/js/*.js'];

// gulp.task('concatScripts', function() {
//   return gulp.src([
//     'client/js/**/*.js',
//     'client/public/*.js'
//   ])
//   .pipe(maps.init())
//   .pipe(concat('app.js'))
//   .pipe(babel({
//     presets: ['es2015']
//   }))
//   .pipe(maps.write('./'))
//   .pipe(gulp.dest('client'));
// })
// gulp.task('concatScripts', function() {
//   return gulp.src([
//     'client/js/**/*.js',
//     'client/public/*.js'
//   ])
//   // .pipe(maps.init())
//   .pipe(concat('app.js'))
//   // .pipe(maps.write('./'))
//   .pipe(gulp.dest('client/bundle'));
// })

// gulp.task('browserify', ['concatScripts'], function() {
//   return browserify({entries: 'client/bundle/app.js', debug: true})
//       .transform(babelify)
//       .bundle()
//       .pipe(source('app.js'))
//       .pipe(buffer())
//       // .pipe(maps.init())
//       .pipe(uglify())
//       // .pipe(maps.write('./'))
//       .pipe(gulp.dest('client/bundle'));
// })
gulp.task('browserify', function() {
  var testFiles = glob.sync(
        'client/js/**/*.js'
      );
  var tetFiles2 = glob.sync('client/public/*.js');
  var filesToTest = testFiles.concat(tetFiles2);
  return browserify({entries: filesToTest, debug: true})
      .transform(babelify)
      .bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(maps.init({loadMaps: true}))
      .pipe(uglify())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('client/bundle'));
})

gulp.task('templateCache', ['browserify'], function () {
  return gulp.src('client/js/**/*.html')
    .pipe(templateCache({standalone: true}))
    .pipe(gulp.dest('client/public'));
});

gulp.task('minifyScripts',['templateCache'], function() {
  return gulp.src('client/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('client/bundle'));
})

gulp.task('compileSass', function() {
  return gulp.src('client/application.scss')
    .pipe(maps.init())
    .pipe(sass())
    // second part of maps.init => shows where maps should...
    // in relation to the gulp.dest
    .pipe(maps.write('./'))
    .pipe(gulp.dest('client/css'));
})

gulp.task('start', function() {
  nodemon({
    script: 'server/app.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('clean', function() {
  del(['dist', 'client/bundle/*']);
});

gulp.task('watch', function() {
  gulp.watch('client/js/**/*.js', ['concatScripts'])
  gulp.watch('client/js/**/*.html', ['minifyScripts'])
  gulp.watch('client/js/**/*.scss', ['compileSass'])
})

// base option keeps directories in check
gulp.task('build', ['clean', 'compileSass','minifyScripts'], function() {
  return gulp.src(['client/css/*', 'client/bundle/*.js', 'node_modules', 'server/**/*', 'index.html'], {base: './'})
        .pipe(gulp.dest('dist'));
})

gulp.task('serve', ['watch']);

gulp.task('default', ['build', 'start', 'watch']);


// http://macr.ae/article/gulp-and-babel.html