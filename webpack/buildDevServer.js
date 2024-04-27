const path = require('path');

module.exports = function devServer () {
    return {
        static: {
            directory: path.join('./dist'),
        },
        compress: true,
        hot: true,
        port: 9000,
    }
}