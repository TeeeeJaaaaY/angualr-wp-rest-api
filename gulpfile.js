/**
 * AngularJS WP API Gulp File
 * @Author Tom James
 *
 * Simple gulp file for compiling scripts and styles used to build this app.
 */

// Load Plugins

var
    gulp = require( 'gulp' ),
    htmlmin = require( 'gulp-htmlmin' ),
    sass = require( 'gulp-ruby-sass' ),
    uglify = require( 'gulp-uglify' ),
    concat = require( 'gulp-concat' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    imagemin = require( 'gulp-imagemin' ),
    svgmin = require( 'gulp-svgmin' ),
    changed = require( 'gulp-changed' );

// File Paths

var
    src = 'src/',
    dest = 'dist/',

    html = {
        src: src,
        dest: dest
    },

    css = {
        src: src + 'scss/',
        dest: dest + 'css/'
    },

    js = {
        src: src + 'js/',
        fileList: [],
        dest: dest + 'js/'
    },

    img = {
        src: src + 'img/',
        dest: dest + 'img/'
    };

// Build HTML

gulp.task( 'html', function() {
    return gulp.src( html.src + '**/*.html' )
        .pipe( changed( html.dest ) )
        .pipe( htmlmin({removeComments: true, collapseWhitespace: true}) )
        .pipe( gulp.dest( html.dest ) );
});

// Complile CSS

gulp.task( 'styles', function() {
    return sass( 'src/scss/app.scss', {sourcemap: true, style: 'compressed'} )
        .pipe( sourcemaps.write( '/' ) )
        .pipe( gulp.dest( css.dest ) );
});

// Compile JavaScript

gulp.task( 'scripts', function() {
    return gulp.src( js.fileList )
        .pipe( sourcemaps.init() )
        .pipe( concat( main.js ) )
        .pipe( uglify() )
        .pipe( sourcemaps.write( '/' ) )
        .pipe( gulp.dest( js.dest ) );
});

// Compress Images

gulp.task( 'images', function() {
    return gulp.src( img.src + '*' )
        .pipe( changed( image.dest ) )
        .pipe( imagemin( {progressive: true} ) )
        .pipe( gulp.dest( js.dest ) );
});

// Compress SVGs

gulp.task( 'svgs', function() {
    return gulp.src( img.src + '*.svg' )
        .pipe( svgmin() )
        .pipe( gulp.dest( img.dest ) );
});

// Default Task

gulp.task( 'default', ['build-html', 'build-css', 'build-js', 'optimize-images', 'optimize-svg'], function() {
    gulp.watch( html.src + '**/*.html', ['html'] );
    gulp.watch( css.src + '*.scss', ['styles'] );
    gulp.watch( js.src + '**/*.js', ['scripts'] );
    gulp.watch( img.src + '**/*', ['images'] );
    gulp.watch( img.src + '*.svg', ['svgs'] );
});