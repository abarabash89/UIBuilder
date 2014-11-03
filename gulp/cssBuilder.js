var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('autoprefixer-stylus');
var nib = require('nib');

var CONFIG = {
    startFile: './components/common.styl',
    development: {
        options: {
            use: [nib(), autoprefixer({
                browsers: ['last 2 version']
            })]
        },
        resultPath: './bin/dev'
    },
    production: {
        options: {
            use: [nib(), autoprefixer({
                browsers: ['last 2 version']
            })],
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
    console.log('End.');
};

gulp.task('buildCss-dev', function () {
    buildCSs(CONFIG.development, 'Development build css');
});

gulp.task('buildCss-production', function () {
    buildCSs(CONFIG.production, 'Production build css');
});