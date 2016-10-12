var webpack = require('webpack');

module.exports = {
    entry: "./app/main.js",
    output: {
        path: __dirname + '/../public/js',
        filename: "bundle.js"
    },
    module: {
        loaders: [{
                test: /\.json$/,
                loader: "json-loader"
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }, {
              test: /\.css$/,
              loader: 'style-loader'
            }, {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                  sourceMap: false,
                  modules: true,
                  localIdentName: '[hash:base64:6]',
                  minimize: true,
                }
            }, {
              test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?.*)?$/,
              loader: 'url-loader?limit=50000'
            }
        ]
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: true,
        comments: false
      }),
      new webpack.optimize.AggressiveMergingPlugin()
    ]
};
