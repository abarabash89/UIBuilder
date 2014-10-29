(function(global) {
    var CONFIG = {
        docPath: './documentation/',
        resultPath: './documentation/documentation.html',
        templatePath: './documentation/templates/',
        cssPath: './components/',
        configFileName: 'cfg.json',
        encode: 'utf8',
        cssLink: '../bind/dev/common.js'
    };
    var BUFFER = {
        navigation: '',
        preview: '',
        template: {
            item: '',
            index: ''
        }
    };

    var jf = require('jsonfile');
    var util = require('util');
    var fs = require('fs');
    var path = require('path');

    var log = function(text) {
        console.log('DocBuilder: ' + text);
    };

    var readJSONFile = function(file) {
        return jf.readFileSync(file);
    };

    var fileRead = function(path) {
        if (fs.statSync(path).isDirectory()) {
            return false;
        }
        return fs.readFileSync(path, CONFIG.encode);
    };

    var loadTemplate = function(config) {
        var templatePath = CONFIG.templatePath + config.template;

        //index
        var htmlTemplate = fileRead(templatePath + '/index.html');
        if (!htmlTemplate) {
            return false;
        }
        BUFFER.template.index = htmlTemplate;

        //item
        var itemTemplate = fileRead(templatePath + '/item.html');
        if (!itemTemplate) {
            return false;
        }
        BUFFER.template.item = itemTemplate;

        return true;
    };

    var buildItem = function(item, path) {
        if (!item || !item.key || !item.path) {
            log((item.name || item.key) + ' syntax error ' + path);
            return;
        }

        var html = fileRead(path + item.path);
        if (!html) {
            log((item.name || item.key) + ' load error ' + path);
            return;
        }

        var itemHtml = BUFFER.template.item.replace(new RegExp('{%item_key%}', 'g'), item.key);
        itemHtml = itemHtml.replace(new RegExp('{%item_name%}', 'g'), item.name || item.key);
        itemHtml = itemHtml.replace(new RegExp('{%item_info%}', 'g'), item.info || '');
        itemHtml = itemHtml.replace(new RegExp('{%item_code%}', 'g'), html);
        BUFFER.preview += itemHtml;

        BUFFER.navigation += '<a href="#' + item.key + '">' + (item.name || item.key) + '</a>';
    };

    var readConfigAndCreateHTML = function(cfg, path, cnfgFileName) {
        if (!cfg) {
            log('File error ' + cnfgFileName);
            return false;
        }

        if (util.isArray(cfg)) {
            for(var i = 0, l = cfg.length; i < l; i++) {
                buildItem(cfg[i], path);
            }
        } else {
            buildItem(cfg, path);
        }

        log('Done ' + cnfgFileName);
        return true;
    };

    var concatArr = function(a, b) {
        for(var i = 0, l = b.length; i < l; i++) {
            a.push(b[i]);
        }
        return a;
    };

    var searchConfigs = global.searchConfigs = function(path) {
        var paths = fs.readdirSync(path);
        var cfgs = [];
        for (var i = 0, l = paths.length; i < l; i++ ) {
            if ('.' === paths[i] || '..' === paths[i]) {
                continue;
            }
            var file = path + paths[i];
            if (fs.statSync(file).isDirectory()) {
                cfgs = concatArr(cfgs, searchConfigs(file + '/'));
            }

            if (CONFIG.configFileName === paths[i]) {
                log('Build ' + file);
                var cfg = readJSONFile(file);
                if (readConfigAndCreateHTML(cfg, path, file)) {
                    cfgs.push({
                        path: file,
                        cfg: cfg
                    });
                }
            }
        }
        return cfgs;
    };

    var buildIndexHTML = function(config) {
        var indexHTML = BUFFER.template.index.replace(new RegExp('{%title%}', 'g'), config.title);
        indexHTML = indexHTML.replace(
            new RegExp('{%css_link%}', 'g'),
            '<link rel="stylesheet" type="text/css" href="' + CONFIG.cssLink + '">'
        );
        indexHTML = indexHTML.replace(new RegExp('{%links%}', 'g'), BUFFER.navigation);
        return indexHTML.replace(new RegExp('{%preview%}', 'g'), BUFFER.preview);
    };

    global.build = function(config) {
        log('START');

        if (!loadTemplate(config)) {
            log('Exceptions: template not loaded');
        }

        searchConfigs(CONFIG.cssPath);

        fs.writeFileSync(CONFIG.resultPath, buildIndexHTML(config), CONFIG.encode);
        log('END');
    };
})(module.exports);