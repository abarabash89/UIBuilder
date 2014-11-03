var gulp = require('gulp');
var cssBuilder = require('../tools/stylusBuilder/builder');

var CONFIG = {
    paths: {
        fileName: 'common.styl',
        basePath: './components/'
    },
    development: {
        resultPath: './bin/dev/common.css'
    },
    production: {
        resultPath: './bin/production/common.css'
    }
};

var buildCSs = function(config, type, label) {
    console.log('Start: ' + label);
    cssBuilder(CONFIG.paths, config, type);
    console.log('End.');
};

gulp.task('buildCss-dev', function () {
    buildCSs(CONFIG.development, 'development', 'Development build css');
});

gulp.task('buildCss-production', function () {
    buildCSs(CONFIG.production, 'production', 'Production build css');
});