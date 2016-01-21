(function() {
  'use strict';
 
  var gulp         = require('gulp'),
    nodemon        = require('gulp-nodemon'),
    watch          = require('gulp-watch'),
    jshint         = require('gulp-jshint'),
    livereload     = require('gulp-livereload'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    sass           = require('gulp-sass'),
    rename         = require('gulp-rename'),
    maps           = require('gulp-sourcemaps'),
    htmlreplace    = require('gulp-html-replace'),
    del            = require('del'),
    nodemon        = require('gulp-nodemon'),
    babelify       = require('babelify'),
    templateCache  = require('gulp-angular-templatecache'),
    browserify     = require('browserify'),
    source         = require('vinyl-source-stream'),
    _paths         = ['server/**/*.js', 'client/js/*.js'];


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
  gulp.task('concatScripts', function() {
    return gulp.src([
      'client/js/**/*.js',
      'client/public/*.js'
    ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    // .pipe(babel({
    //   presets: ['es2015']
    // }))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('client/bundle'));
  })

  gulp.task('browserify', ['concatScripts'], function() {
    return browserify({
      entries: 'client/bundle/app.js',
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('client/bundle'))
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
    del(['dist', 'client/bundle']);
  });
 
  gulp.task('watch', function() {
    gulp.watch('client/js/**/*.js', ['concatScripts'])
    gulp.watch('client/js/**/*.html', ['minifyScripts'])
    gulp.watch('client/js/**/*.scss', ['compileSass'])
  })

  gulp.task('replaceJS', function() {
    gulp.src('index.html')
      .pipe(htmlreplace({
        'js': 'client/app.min.js'
      }))
      .pipe(gulp.dest('dist'));
  })

  // base option keeps directories in check
  gulp.task('build', ['clean', 'replaceJS', 'compileSass','minifyScripts'], function() {
    return gulp.src(['client/css/application.css', 'client/bundle/*', 'node_modules', 'server/**/*'], {base: './'})
          .pipe(gulp.dest('dist'));
  })

  gulp.task('serve', ['watch']);

  gulp.task('default', ['clean', 'build', 'start', 'watch']);

}());

