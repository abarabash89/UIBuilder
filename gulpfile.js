var gulp = require('gulp');
var less = require('gulp-less');

var CONFIG = {
    watch: [{
        files: ['./components/**/*.*'],
        tasks: ['buildCss-dev']
    }]
};

(function lessBuilder(gulp, less) {
    var buildCSs = function(path, options) {
        isError = false;
        gulp.src('./components/common.less')
            .on('error', console.log)
            .pipe(less(options || {}))
            .pipe(gulp.dest(path));
    };

    gulp.task('buildCss-dev', function () {
        console.log('Start: Development build css');
        buildCSs('./bin/dev');
        console.log('End.');
    });

    gulp.task('buildCss-production', function () {
        console.log('Start: Production build css');
        buildCSs('./bin/production', {
            compress: true
        });
        console.log('End.');
    });
})(gulp, less);

gulp.task('build', ['buildCss-dev', 'buildCss-production']);

//*===WATCH - START===*/
gulp.task('watch', function() {
    for(var i = 0, l = CONFIG.watch.length; i < l; i++) {
        gulp.watch(CONFIG.watch[i].files, CONFIG.watch[i].tasks);
    }
});
//*===WATCH - END===*/