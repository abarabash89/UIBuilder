var CONFIG = {
    watch: [{
        files: ['./components/**/*.*'],
        tasks: ['buildCss-dev', 'doc-build']
    }],
    less: {
        development: {
            options: {},
            resultPath: './bin/dev'
        },
        production: {
            options: {
                compress: true
            },
            resultPath: './bin/production'
        }
    },
    tests: {
        casperPath: './node_modules/.bin/casperjs',
        testsScript: 'tests/tests.js'
    },
    documentationBuilder: {
        template: 'default',
        title: 'CSS components'
    }
};

var gulp = require('gulp');
var exec = require('child_process').exec;

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

(function documentationBuilder(CONFIG) {
    gulp.task('doc-build', function () {
        require('./tools/documentation-builder/doc-builder').build(CONFIG);
    });
    gulp.task('docBuild', ['documentation-build']);
})(CONFIG.documentationBuilder);

gulp.task('build', ['buildCss-dev', 'buildCss-production', 'doc-build']);

gulp.task('tests', function runTests() {
    var cmd = CONFIG.tests.casperPath + ' test ' + CONFIG.tests.testsScript;
    exec(cmd ,function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        console.log(err);
    });
});
//*===WATCH - START===*/
gulp.task('watch', function() {
    for(var i = 0, l = CONFIG.watch.length; i < l; i++) {
        gulp.watch(CONFIG.watch[i].files, CONFIG.watch[i].tasks);
    }
});
//*===WATCH - END===*/