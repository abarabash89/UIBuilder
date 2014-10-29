var phantomcss = require('../../node_modules/phantomcss/phantomcss.js');
//var global = require('../tools/documentation-builder/doc-builder').searchConfigs;

phantomcss.init({
    screenshotRoot: './tests/screenshots',
    failedComparisonsRoot: './tests/fail-screenshots',
    libraryRoot: './node_modules/phantomcss/',
    fileNameGetter: function(root,filename){
        var name = root + '/' + filename;
        if(fs.isFile(name+'.png')){
            return name+'.diff.png';
        } else {
            return name+'.png';
        }
    }
});

var pathFiles = './tests/html';


casper.start();
casper.viewport(1024, 1024);

var fs = require('fs');
var listFiles = fs.list(pathFiles);

for (var i = 2, l = listFiles.length; i < l; i++) {
    (function(file) {
        var path = pathFiles + '/' + file;
        var fileName = file.split('.');
        casper.thenOpen(path)
            .then(function () {
                phantomcss.screenshot('.test-element', fileName[0]);
            });
    })(listFiles[i]);
}



casper.then(function () {
    phantomcss.compareAll();
});

casper.run(function () {
    this.test.done();
});