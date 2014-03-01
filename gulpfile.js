var gulp = require ('gulp');

var uglify = require ('gulp-uglify');
var concat = require ('gulp-concat');

gulp.task ('build', function(){
  gulp.src ('./static/js/resume.js')
  .pipe (uglify ())
  .pipe (concat ('resume.min.js'))
  .pipe (gulp.dest ('./static/js/'));
});

