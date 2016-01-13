(function() {
  'use strict';
 
  var gulp         = require('gulp'),
    nodemon        = require('gulp-nodemon'),
    watch          = require('gulp-watch'),
    jshint         = require('gulp-jshint'),
    livereload     = require('gulp-livereload'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    rename         = require('gulp-rename'),
    maps           = require('gulp-sourcemaps'),
    htmlreplace    = require('gulp-html-replace'),
    mainbowerFiles = require('main-bower-files'),
    del            = require('del'),
    nodemon        = require('gulp-nodemon'),
    templateCache  = require('gulp-angular-templatecache'),
    _paths         = ['server/**/*.js', 'client/js/*.js'];


  gulp.task('concatScripts', function() {
    return gulp.src([
      'client/lib/**/*',
      'client/js/**/*.js',
      'client/public/*.js'
    ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    // run babel here!
    .pipe(maps.write('./'))
    .pipe(gulp.dest('client'));
  })

  gulp.task('templateCache', ['concatScripts'], function () {
    return gulp.src('client/js/**/*.html')
      .pipe(templateCache({standalone: true}))
      .pipe(gulp.dest('client/public'));
  });

  gulp.task('minifyScripts',['templateCache'], function() {
    return gulp.src('client/app.js')
      // .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('client'));
  })

  gulp.task('start', function() {
    nodemon({
      script: 'server/app.js',
      ext: 'js html',
      env: { 'NODE_ENV': 'development' }
    })
  })

  // gulp.task('bower', function() {
  //   // return gulp.src(mainbowerFiles(), {
  //   //     base: 'client/lib'
  //   //   })
  //   return gulp.src(mainbowerFiles({ paths: {
  //       bowerJson: 'bower.json',
  //       bowerDirectory: 'client/lib'
  //     }}))
  //     .pipe(rename('bower.min.js'))
  //     .pipe(gulp.dest('client'));
  // })

  gulp.task('clean', function() {
    del(['dist', 'client/app*.js*', 'client/bower.min.js']);
  });
 
  gulp.task('watch', function() {
    gulp.watch('client/js/**/*', ['minifyScripts'])
  })

  gulp.task('replaceJS', function() {
    gulp.src('index.html')
      .pipe(htmlreplace({
        'js': 'client/app.min.js'
      }))
      .pipe(gulp.dest('dist'));
  })

  // base option keeps directories in check
  gulp.task('build', ['replaceJS', 'minifyScripts'], function() {
    return gulp.src(['client/app.min.js'], {base: './'})
          .pipe(gulp.dest('dist'));
  })

  gulp.task('serve', ['watch']);

  gulp.task('default', ['clean'], function() {
    gulp.start('build');
  });

  // //register nodemon task
  // gulp.task('nodemon', function() {
  //   nodemon({
  //     script: 'server/app.js',
  //     env: {
  //       'NODE_ENV': 'development'
  //     }
  //   })
  //     .on('restart');
  // });
 
  // // Rerun the task when a file changes
  // gulp.task('watch', function() {
  //   livereload.listen();
  //   gulp.src(_paths, {
  //     read: false
  //   })
  //     .pipe(watch({
  //       emit: 'all'
  //     }))
  //     .pipe(jshint())
  //     .pipe(jshint.reporter('default'));
  //   watch(_paths, livereload.changed);
  // });
 
  // //lint js files
  // gulp.task('lint', function() {
  //   gulp.src(_paths)
  //     .pipe(jshint())
  //     .pipe(jshint.reporter('default'));
  // });
 
 
  // // The default task (called when you run `gulp` from cli)
  // gulp.task('default', ['lint', 'nodemon', 'watch']);
 
}());