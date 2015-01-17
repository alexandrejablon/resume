var gulp = require ('gulp');
var uglify = require ('gulp-uglify');
var concat = require ('gulp-concat');
var sourcemaps = require ('gulp-sourcemaps');

var paths = {
  scripts: [ './client/resume.js' ]
};

gulp.task ('scripts', function (){
  return gulp.src (paths.scripts)
    .pipe(sourcemaps.write ())
    .pipe (uglify ())
    .pipe (concat ('resume.min.js'))
    .pipe(sourcemaps.write ())
    .pipe (gulp.dest ('./static/js/'));
});

gulp.task ('watch', function() {
  gulp.watch (paths.scripts, ['scripts']);
});

gulp.task ('default', ['watch', 'scripts']);

