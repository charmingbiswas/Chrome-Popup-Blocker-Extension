const path = require('path');
const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(webpackConfig, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'popup.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public',
                },
            ],
        }),
    ],
});
