var autoprefixer = require('gulp-autoprefixer');
var beeper = require('beeper');
var browserSync = require('browser-sync');
var cache = require('gulp-cache');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

//import required dependencies

var jsFiles = ['assets/js/jquery.min.js',
    'assets/js/app.js', "assets/js/svg.js", "assets/js/scroll_knight.js"
];

//concatenate js files

var fs = require('fs');

var onError = function(err) {
    notify.onError({
        title: "Gulp error in " + err.plugin,
        message: err.toString()
    })(err);
    // beeper(3);
    this.emit('end');
    gutil.log(gutil.colors.red(err));
};
//this block will give error in red fonts instade of stopping on error

gulp.task('styles', function() {
    gulp.src('assets/sass/style.sass')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass({ includePaths: ['./assets/sass'] }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('build/assets/css'));
});
//styles task to compile sass and build sass sourcemaps

gulp.task('templates', function() {
    gulp.src('./*.pug')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(pug())
        .pipe(gulp.dest('build/'));
});
//templates task to compile pug

gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sourcemaps.init())
        // .pipe(concat('all.js'))
        // .pipe(uglify())
        // .pipe(sourcemaps.write('.'))
        // .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('build/assets/js'));
});
//scripts task to minify js files

gulp.task('images', function() {
    gulp.src('assets/img/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('build/assets/img/'));
});
//copy images to build

gulp.task('clean', function() {
    console.log('Deleting .build/');
    del(['build/']);
});


gulp.task('default', function() {
    gulp.start('styles', 'templates', 'scripts', 'images', 'watch');
});

gulp.task('watch', function() {
    gulp.watch('assets/sass/**/*', ['styles']);
    gulp.watch(['pugfiles/**/*.pug', './*.pug'], ['templates']);
    gulp.watch('assets/js/*.js', ['scripts']);
    gulp.watch('assets/img/**/*', ['images']);

    // init server
    browserSync.init({
        server: {
            proxy: "local.build",
            baseDir: "build/"
        }
    });

    gulp.watch(['build/**'], browserSync.reload);
});