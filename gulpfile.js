/**
 * Created by developer on 15.01.15.
 */
var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    rename = require("gulp-rename"),
    csscomb = require("gulp-csscomb"),
    path = require('path');

var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix= new LessPluginAutoPrefix({browsers:
        [
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 18',
            'Firefox >= 20', // Firefox 24 is the latest ESR
            'Explorer >= 6',
            'iOS >= 6',
            'Opera >= 9',
            'Safari >= 6'
        ]});
/*
 *  Компилируем LESS в CSS
 *  делаем Autoprefix и CssComb
 */
gulp.task('less', function() {
    gulp.src('./less/*.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(csscomb())
        .pipe(gulp.dest('./css'));
});

/*
 *  Минифицируем CSS
 */
gulp.task('cssminify', function() {
    gulp.src('./css/style.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./css'));
});

/*
 *  Смотрим изменения в LESS и CSS,
 *  после изменения:
 *  1. Компилируем LESS
 *  2. Минифицируем CSS
 */
gulp.task('watch', function(){
    gulp.watch('./less/*.less',['less']);
    gulp.watch('./css/style.css', ['cssminify']);
});

/*
 *  Таsк по умолчанию
 */
gulp.task('default', function() {
});