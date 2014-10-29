var CONFIG = {
    watch: [{
        files: ['./components/**/*.*'],
        tasks: ['buildCss-dev']
    }],
    less: {
        development: {
            options: {},
            resultPath: './documentation/dev'
        },
        production: {
            options: {
                compress: true
            },
            resultPath: './documentation/production'
        }
    }
};

var gulp = require('gulp');

(function lessBuilder(gulp, CONFIG) {
    var less = require('gulp-less');

    var buildCSs = function(config, label) {
        console.log('Start: ' + label);
        gulp.src('./components/common.less')
            .on('error', console.log)
            .pipe(less(config.options))
            .pipe(gulp.dest(config.resultPath));
        console.log('End.');
    };

    gulp.task('buildCss-dev', function () {
        buildCSs(CONFIG.development, 'Development build css');
    });

    gulp.task('buildCss-production', function () {
        buildCSs(CONFIG.production, 'Production build css');
    });
})(gulp, CONFIG.less);

gulp.task('build', ['buildCss-dev', 'buildCss-production']);

//*===WATCH - START===*/
gulp.task('watch', function() {
    for(var i = 0, l = CONFIG.watch.length; i < l; i++) {
        gulp.watch(CONFIG.watch[i].files, CONFIG.watch[i].tasks);
    }
});
//*===WATCH - END===*/