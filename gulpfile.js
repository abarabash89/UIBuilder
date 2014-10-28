var gulp = require('gulp');

gulp.task('default', function() {
    console.log('run default task');
});


gulp.watch('./package.json', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});