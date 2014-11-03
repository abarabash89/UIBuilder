var nib = require('nib');
var autoprefixer = require('autoprefixer-stylus');

module.exports = {
    encode: 'utf8',
    development: {
        use: [nib(), autoprefixer({
            browsers: ['last 2 version']
        })]
    },
    production: {
        use: [nib(), autoprefixer({
            browsers: ['last 2 version']
        })],
        compress: true
    }
};