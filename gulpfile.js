var gulp = require('gulp');

var uglify = require('gulp-uglify');

gulp.task ('build', function(){
  gulp.src ('./static/js/resume.js')
  .pipe (uglify ())
  .pipe (gulp.dest ('./static/js/resume.min.js'));
});

