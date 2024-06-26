const { webpack } = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin'),
      ImageMinimizerPlugin = require('image-minimizer-webpack-plugin'),
      BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function plugins() {
    return  [
            new HtmlWebpackPlugin({
              template: './src/index.html',
              inject: 'body',
              scriptLoading: 'defer',
            }),
            new ImageMinimizerPlugin({
              minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                  // Lossless optimization with custom option
                  // Feel free to experiment with options for better result for you
                  plugins: [
                    ["gifsicle", { interlaced: true }],
                    ["mozjpeg", { progressive: true, quality: 90 }],
                    ["optipng", { optimizationLevel: 5 }],  
                    // Svgo configuration here https://github.com/svg/svgo#configuration
                    [
                      "svgo",
                      {
                        plugins: [
                          {
                            name: "preset-default",
                            params: {
                              overrides: {
                                removeViewBox: false,
                                addAttributesToSVGElement: {
                                  params: {
                                    attributes: [
                                      { xmlns: "http://www.w3.org/2000/svg" },
                                    ],
                                  },
                                },
                              },
                            },
                          },
                        ],
                      },
                    ],
                  ],
                },
              },
            }),
            // new BundleAnalyzerPlugin(),
          ]
}