var gulp = require('gulp');
var docBuilder = require('../tools/doc-builder/doc-builder');

var CONFIG = {
    template: 'default',
    title: 'UIBilder documentation'
};

gulp.task('doc-build', function () {
    docBuilder.build(CONFIG);
});

gulp.task('docBuild', ['documentation-build']);