var gulp = require('gulp');
var exec = require('child_process').exec;

var CONFIG = {
    casperPath: './node_modules/.bin/casperjs',
    testsScript: 'tools/tests/tests.js'
};

gulp.task('tests', function runTests() {
    var cmd = CONFIG.casperPath + ' test ' + CONFIG.testsScript;
    var config = require('../tools/doc-builder/doc-builder').searchConfigs();
    var createHtml = require('../tools/tests/create-html');
    createHtml.build(config);
    exec(cmd ,function (err, stdout, stderr) {
        stdout && console.log(stdout);
        stderr && console.log(stderr);
        err && console.log(err);
        createHtml.clear();
    });
});