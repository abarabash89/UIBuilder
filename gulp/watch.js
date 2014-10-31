var gulp = require('gulp');

var CONFIG = [{
    files: ['./components/**/*.*'],
    tasks: ['buildCss-dev', 'doc-build']
}];

gulp.task('watch', function() {
    for(var i = 0, l = CONFIG.watch.length; i < l; i++) {
        gulp.watch(CONFIG.watch[i].files, CONFIG.watch[i].tasks);
    }
});