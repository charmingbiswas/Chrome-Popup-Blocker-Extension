const path = require('path');
const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(webpackConfig, {
    mode: 'production',
});
