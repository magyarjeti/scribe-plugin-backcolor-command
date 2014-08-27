var gulp = require('gulp');
var traceur = require('gulp-traceur');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
    gulp.src('src/*.js')
        .pipe(traceur({ modules: 'amd', moduleName: true }))
        .pipe(gulp.dest('build/'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('build/'));
});
