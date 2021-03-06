var path = require('path');
var webpack = require('webpack');

module.exports = {
entry: './src/main.js',
output: {
path: path.resolve(__dirname, 'js'),
filename: 'main.bundle.js'
},
    
plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
        })
],

module: {
loaders: [
          {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
          presets: ['es2015']
          }
          }
          ]
},
stats: {
colors: true
},
devtool: 'source-map'
};
