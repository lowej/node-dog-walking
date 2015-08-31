var gulp = require('gulp')
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')
var nodemon = require('gulp-nodemon')

//This task creates the assets/app/js file by merging all the stuff in ng (Angular)
//Directory together
//module.js allows goes at the top of the merged file.
gulp.task('js', function () {
  gulp.src(['ng/module.js', 'ng/**/*.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets'))
})

gulp.task('watch:js', ['js'], function () {
  gulp.watch('ng/**/*.js', ['js'])
})

//Runs the node server
gulp.task('dev:server', function () {
  nodemon({
    script: 'server.js',
    ext:    'js',
    ignore: ['ng*', 'gulp*', 'assets*']
  })
})


//This is the master command that runs EVERYTHING.  
//1. Builds the system
//2. Runs the node server
//NOTE - should add a watch:css task if want CSS style sheets included too.
gulp.task('dev', ['watch:js', 'dev:server'])



