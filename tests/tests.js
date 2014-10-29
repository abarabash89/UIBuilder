var phantomcss = require('../node_modules/phantomcss/phantomcss.js');

phantomcss.init({
    screenshotRoot: './test/screenshots',
    failedComparisonsRoot: './test/fail-screenshots'
});


casper.start();
casper.viewport(1024, 1024);

casper.then(function () {
    phantomcss.compareAll();
});

casper.run(function () {
    this.test.done();
});