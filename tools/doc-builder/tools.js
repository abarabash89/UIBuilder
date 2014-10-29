(function (global) {
    var jf = require('jsonfile');
    var fs = require('fs');

    global.log = function(text) {
        console.log('DocBuilder: ' + text);
    };

    global.readJSONFile = function(file) {
        return jf.readFileSync(file);
    };

    global.concatArr =  function(a, b) {
        for(var i = 0, l = b.length; i < l; i++) {
            a.push(b[i]);
        }
        return a;
    };

    global.fileRead = function(path, encode) {
        if (fs.statSync(path).isDirectory()) {
            return false;
        }
        return fs.readFileSync(path, encode);
    };

})(module.exports);