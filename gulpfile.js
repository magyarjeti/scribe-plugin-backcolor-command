var gulp = require('gulp');
var es6ModuleTranspiler = require('gulp-es6-module-transpiler');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
    gulp.src('src/*.js')
        .pipe(es6ModuleTranspiler({ type: 'amd' }))
        .pipe(gulp.dest('build/'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('build/'));
});
