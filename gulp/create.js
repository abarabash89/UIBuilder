var gulp = require('gulp');
var argv = require('yargs').argv;
var fs = require('fs');

var CONFIG = {
    componentsFolder: './components/',
    commonStyl: './components/common.styl',
    struct: {
        html: '%name%.html',
        style: '%name%.styl',
        cnf: 'cfg.json'
    },
    cnfStruct: '{\n\t"path": "%name%.html", \n\t"key": "%key%", \n\t"name": "%title%"\n}',
    commonPattern: '\n@import "%name%/%name%.styl";',
    style: '.%name% {\n\n}'
};

var isExistDir = function (path) {
    var tempDir = fs.existsSync(path);
    if (tempDir) {
        return;
    }
    fs.mkdirSync(path);
};

var replace = function (str, key, value) {
    return str.split(key).join(value);
};

var ucfirst = function( str ) {
    var f = str.charAt(0).toUpperCase();
    return f + str.substr(1, str.length-1);
};

gulp.task('create', function runTests() {
    var name = replace(argv.name, ' ', '_');
    var folderPath = CONFIG.componentsFolder + name;
    if (isExistDir(folderPath)) {
        console.log('Component is exist');
        return;
    }

    fs.writeFileSync(folderPath + '/' + CONFIG.struct.html.replace('%name%', name), '');
    fs.writeFileSync(
        folderPath + '/' + CONFIG.struct.style.replace('%name%', name),
        CONFIG.style.replace('%name%', name)
    );

    var config = CONFIG.cnfStruct.replace('%name%', name)
                                     .replace('%key%', name)
                                     .replace('%title%', ucfirst(name));
    fs.writeFileSync(folderPath + '/' + CONFIG.struct.cnf, config);


    fs.appendFileSync(CONFIG.commonStyl, replace(CONFIG.commonPattern, '%name%', name));

    console.log('Done');
});