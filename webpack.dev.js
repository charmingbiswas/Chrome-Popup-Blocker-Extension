const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
});
