(function(global) {
    var CONFIG = require('./config');
    var tools = require('./tools');
    var util = require('util');
    var fs = require('fs');
    var path = require('path');
    var hl = require("highlight").Highlight;

    var BUFFER = {
        navigation: '',
        preview: '',
        template: {
            item: '',
            index: ''
        }
    };

    var loadTemplate = function(config) {
        var templatePath = CONFIG.templatePath + config.template;

        //index
        var htmlTemplate = tools.fileRead(templatePath + '/index.html', CONFIG.encode);
        if (!htmlTemplate) {
            return false;
        }
        BUFFER.template.index = htmlTemplate;

        //item
        var itemTemplate = tools.fileRead(templatePath + '/item.html', CONFIG.encode);
        if (!itemTemplate) {
            return false;
        }
        BUFFER.template.item = itemTemplate;

        return true;
    };

    var buildItem = function(item, path) {
        if (!item || !item.key || !item.path) {
            tools.log((item.name || item.key) + ' syntax error ' + path);
            return;
        }

        var html = tools.fileRead(path + item.path, CONFIG.encode);
        if (!html) {
            tools.log((item.name || item.key) + ' load error ' + path);
            return;
        }

        var itemHtml = BUFFER.template.item.replace(new RegExp('{%item_key%}', 'g'), item.key);
        itemHtml = itemHtml.replace(new RegExp('{%item_name%}', 'g'), item.name || item.key);
        itemHtml = itemHtml.replace(new RegExp('{%item_info%}', 'g'), item.info || '');
        itemHtml = itemHtml.replace(new RegExp('{%item_code%}', 'g'), hl(html));
        itemHtml = itemHtml.replace(new RegExp('{%item_element%}', 'g'), html);
        BUFFER.preview += itemHtml;

        BUFFER.navigation += '<a href="#' + item.key + '">' + (item.name || item.key) + '</a>';
    };

    var readConfigAndCreateHTML = function(cfg, path, cnfgFileName) {
        if (util.isArray(cfg)) {
            for(var i = 0, l = cfg.length; i < l; i++) {
                buildItem(cfg[i], path);
            }
        } else {
            buildItem(cfg, path);
        }

        tools.log('Done ' + cnfgFileName);
        return true;
    };

    var searchConfigs = global.searchConfigs = function(path, isBuild) {
        if (!path) {
            path = CONFIG.cssPath;
        }
        var paths = fs.readdirSync(path);
        var cfgs = [];
        for (var i = 0, l = paths.length; i < l; i++ ) {
            if ('.' === paths[i] || '..' === paths[i]) {
                continue;
            }
            var file = path + paths[i];
            if (fs.statSync(file).isDirectory()) {
                var folderCfgs = searchConfigs(file + '/', isBuild);
                cfgs = tools.concatArr(cfgs, folderCfgs);
            }

            if (CONFIG.configFileName === paths[i]) {
                tools.log('Build ' + file);

                var cfg = tools.readJSONFile(file);
                if (!cfg) {
                    tools.log('File error ' + cnfgFileName);
                    continue;
                }

                cfgs.push({
                    path: path,
                    cfg: cfg
                });

                if (isBuild) {
                    readConfigAndCreateHTML(cfg, path, file);
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

    var clear = function() {
        BUFFER = {
            navigation: '',
            preview: '',
            template: {
                item: '',
                index: ''
            }
        };
    };

    global.build = function(config) {
        clear();
        tools.log('START');

        if (!loadTemplate(config)) {
            tools.log('Exceptions: template not loaded');
            clear();
            return;
        }

        searchConfigs(CONFIG.cssPath, true);

        fs.writeFileSync(CONFIG.resultPath, buildIndexHTML(config), CONFIG.encode);
        tools.log('END');
        clear();
    };
})(module.exports);