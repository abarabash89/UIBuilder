var phantomcss = require('../node_modules/phantomcss/phantomcss.js');

phantomcss.init({
    screenshotRoot: './tests/screenshots',
    failedComparisonsRoot: './tests/fail-screenshots',
    libraryRoot: './node_modules/phantomcss/'
});


casper.start();
casper.viewport(1024, 1024);

casper.thenOpen('./documentation/templates/default/index.html')
      .then(function () {
          phantomcss.screenshot('.nav', 'test');
      });

casper.then(function () {
    phantomcss.compareAll();
});

casper.run(function () {
    this.test.done();
});