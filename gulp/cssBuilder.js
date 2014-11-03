var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var nib = require('nib');
var cssBase64 = require('gulp-css-base64');

var CONFIG = {
    startFile: './components/common.styl',
    development: {
        options: {
            use: [nib()]
        },
        resultPath: './bin/dev'
    },
    production: {
        options: {
            use: [nib()],
            compress: true
        },
        resultPath: './bin/production'
    }
};

var buildCSs = function(config, label) {
    console.log('Start: ' + label);
    gulp.src(CONFIG.startFile)
        .pipe(stylus(config.options))
        .pipe(gulp.dest(config.resultPath));

    gulp.src(config.resultPath + '/common.css')
        .on('error', console.log)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(gulp.dest(config.resultPath));
    console.log('End.');
};

gulp.task('buildCss-dev', function () {
    buildCSs(CONFIG.development, 'Development build css');
});

gulp.task('buildCss-production', function () {
    buildCSs(CONFIG.production, 'Production build css');
});