const { merge } = require('webpack-merge'),
      common = require('./webpack.config.common.js'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(css|sass|scss|less)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/style[contenthash].css",
          })
    ]
});