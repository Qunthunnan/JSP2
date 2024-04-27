const path = require('path'),
      babel = require('./buildBabel.js'),
      loaders = require('./buildLoaders.js'),
      plugins = require('./buildPlugins.js'),
      resolve = require('./buildResolve.js');

module.exports = {
      entry: {
        'js/script.js': './src/js/main.js',
      },
      output: {
        path: path.resolve(__dirname, './../dist'),
        clean: false,
      },
      module: {
        rules: [
          babel(),
          ...loaders()
        ]
      },
      optimization: {
        runtimeChunk: 'single',
      },
      plugins: plugins(),
      resolve: resolve()
    }

