const path = require('path');

module.exports = function resolve () {
    return {
        alias: {
            '@': path.resolve(__dirname, './../src'),
        }
    }
}