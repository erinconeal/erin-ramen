const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sass = require('gulp-sass')

const paths = {
  jsPaths: ['./public/app.js', './public/**/*.js'],
  sassSource: ['./public/styles/*.sass']
}

// gulp.task('concat', function() {
//   gulp.src(paths.jsPaths)
//   .pipe(concat('all.js'))
//   .pipe(gulp.dest('./dist'))
// })
//
// gulp.task('es6', function() {
//   gulp.src(paths.jsPaths)
//   .pipe(babel({
//     presets: ['es2015']
//   }))
//   .pipe(gulp.dest('./dist'))
// })

gulp.task('es6-bundle', function() {
  gulp.src(paths.jsPaths)
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(concat('all.js'))
  .pipe(gulp.dest('./dist'))
})

gulp.task('sass', function() {
  return gulp.src(paths.sassSource)
  .pipe(sass())
  .pipe(concat('style.css'))
  .pipe(gulp.dest('./public/styles'))
})

gulp.watch(paths.jsPaths, ['es6-bundle'])
gulp.watch(paths.sassSource, ['sass'])
gulp.task('default', ['es6-bundle', 'sass'])
