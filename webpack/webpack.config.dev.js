const { merge } = require('webpack-merge'),
      common = require('./webpack.config.common.js'),
      devServer = require('./buildDevServer.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    hot: 'webpack/hot/dev-server.js',
    client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true',
  },
  devServer: devServer(),
});