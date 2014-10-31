var gulp = require('gulp');
gulp.task('build', ['buildCss-dev', 'buildCss-production', 'doc-build', 'tests']);