/* File: gulpfile.js */
'use strict';

// gulp reqs
var gulp     = require('gulp'),
  concat     = require('gulp-concat'),
  gutil      = require('gulp-util'),
  jshint     = require('gulp-jshint'),
  notify     = require('gulp-notify'),
  livereload = require('gulp-livereload'),
  sass       = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify     = require('gulp-uglify');

// setup jshint
gulp.task('jshint', function () {
  return gulp.src(['source/js/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// compile js
gulp.task('compile-js', function () {
  gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/foundation/js/foundation/foundation.js',
    'bower_components/foundation/js/foundation/foundation.alert.js',
    'bower_components/d3/d3.d3.min.js',
    'source/js/**/*.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    // uglify if env = production
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/js'))
    .pipe(livereload())
    .pipe(notify({ message: 'Finished compiling js files' }));
  return gulp.src('bower_components/modernizr/modernizr.js')
    .pipe(gulp.dest('app/js'));
});

// compile css
gulp.task('compile-css', function () {
  return gulp.src([
      'source/**/*.scss', 
      'bower_components/fontawesome/scss/font-awesome.scss'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.css'))
    // uglify if env = production
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sass({includePaths: [
      'bower_components/foundation/scss',
      'bower_components/fontawesome/scss']})
    .on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/css'))
    .pipe(livereload())
    .pipe(notify({ message: 'Finished compiling scss files' }));
});

// copy font-awesome fonts
gulp.task('copy-fontawesome', function () {
  return gulp.src('bower_components/fontawesome/fonts/**/*.*')
    .pipe(gulp.dest('app/fonts'))
    .pipe(notify({ message: 'Finished copying a fontawesome file' }));
});

// copy markup
gulp.task('copy-markup', function () {
  gulp.src('source/html/**/*.html')
    .pipe(gulp.dest('app'))
    .pipe(livereload())
    .pipe(notify({ message: 'Finished copying an HTML file' }));
});

// watch files
gulp.task('watch', ['build'], function () {
  notify({ message: 'Gulp started to watch existing files for changes' });
  livereload.listen();
  gulp.watch('source/html/**/*.html', ['copy-markup']);
  gulp.watch(['source/scss/**/*.scss',
    'bower_components/fontawesome/scss/font-awesome.scss'], ['compile-css']);
  gulp.watch('source/js/**/*.js', ['jshint', 'compile-js']);
  gulp.watch('bower_components/fontawesome/fonts/**/*.*', ['copy-fontawesome']);
});

// build
gulp.task('build', ['copy-markup', 'compile-css', 'jshint', 'compile-js', 'copy-fontawesome']);

// default task
gulp.task('default', ['build']);
