const path = require('path');
module.exports = function babel() {
    return {
        test: /\.m?js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: "3.34",
                  debug: false
                }
              ]
            ],
          }
        }
      }
}