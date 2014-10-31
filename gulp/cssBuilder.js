var gulp = require('gulp');
var nib = require('nib');
var stylus = require('gulp-stylus');

var CONFIG = {
    development: {
        options: {
            use: nib()
        },
        resultPath: './bin/dev'
    },
    production: {
        options: {
            use: nib(),
            compress: true
        },
        resultPath: './bin/production'
    }
};

var buildCSs = function(config, label) {
    console.log('Start: ' + label);
    gulp.src('./components/common.styl')
        .pipe(stylus(config.options))
        .pipe(gulp.dest(config.resultPath));
    console.log('End.');
};

gulp.task('buildCss-dev', function () {
    buildCSs(CONFIG.development, 'Development build css');
});

gulp.task('buildCss-production', function () {
    buildCSs(CONFIG.production, 'Production build css');
});