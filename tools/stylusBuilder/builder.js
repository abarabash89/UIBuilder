module.exports = function (paths, userOption, type) {
    'use strict';

    var CONFIG = require('./config');
    var util = require('util');
    var stylus  = require('stylus');
    var fs = require('fs');

    if (!CONFIG.hasOwnProperty(type)) {
        throw 'Type error.';
    }

    if (!userOption.hasOwnProperty('resultPath')) {
        throw 'Result path not found.';
    }

    //create&merge options
    var filePath = paths.basePath + paths.fileName;
    var options = {
        filename: filePath,
        paths: [paths.basePath]
    };

    var configOptions = CONFIG[type];
    for(var key in configOptions) {
        if (options.hasOwnProperty(key)) {
            if ('paths' === key) {
                options.paths.concat(configOptions[key]);
            }
            continue;
        }
        options[key] = configOptions[key];
    }

    //read first file
    var file = fs.readFileSync(filePath, CONFIG.encode);
    if (!file) {
        throw 'Fileread error.';
    }

    //create stylusBuilder
    var stylusBuilder = stylus(file);

    //add options 2 stylusBuilder
    for(var key in options) {
        if ('use' === key) {
            if (util.isArray(options[key])) {
                for(var i = 0, l = options[key]; i < l; i++) {
                    stylusBuilder.use(options[key][i]);
                }
            } else {
                stylusBuilder.use(options[key]);
            }
            continue;
        }
        stylusBuilder.set(key, options[key])
    }

    //add 2 stylusBuilder url encode util
    stylusBuilder.define('url', stylus.url());

    //render css
    stylusBuilder.render(function(error, css) {
        if (css === undefined) {
            throw 'Build error.';
        }
        //write css 2 file
        fs.writeFileSync(userOption.resultPath, css, CONFIG.encode);
    });
};