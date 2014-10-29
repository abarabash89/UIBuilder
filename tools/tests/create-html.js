(function (createHtml) {
    var CONFIG = {
        tempDir: './tests/html',
        encode: 'utf8',
        pathTemplate: './tests/config/test.html',
        key: '{%element%}'
    };

    var fs = require('fs');
    var path = require('path');

    var template = '';

    var createPage = function (element) {
        var files = element.cfg;
        for (var i = 0, l = files.length; i < l; i++) {
            var text = fs.readFileSync(element.path + files[i].path, CONFIG.encode);
            if (text) {
                var fileContent = template.replace(CONFIG.key, text);
                var filePath = CONFIG.tempDir + '/' + files[i].name.replace(' ', '-') + '.html';
                fs.writeFileSync(filePath, fileContent, CONFIG.encode);
            }
        }
    };

    var isExistDir = function (path) {
        var tempDir = fs.existsSync(path);
        if (tempDir) {
            return;
        }
        fs.mkdirSync(path);
    };

    var prepareTemplate = function (path) {
        template = fs.readFileSync(path, CONFIG.encode);
        return template;
    };

    createHtml.build = function (config) {
        isExistDir(CONFIG.tempDir);
        prepareTemplate(CONFIG.pathTemplate);

        for (var i = 0, l = config.length; i < l; i++) {
            createPage(config[i]);
        }
    };

    createHtml.clear = function (config) {
        var files = fs.readdirSync(CONFIG.tempDir);
        for (var i = 0, l = files.length; i < l; i++) {
            fs.unlinkSync(CONFIG.tempDir + '/' + files[i]);
        }
        fs.rmdirSync(CONFIG.tempDir);
    };
})(module.exports);