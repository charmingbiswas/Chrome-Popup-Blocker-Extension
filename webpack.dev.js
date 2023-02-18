const path = require('path');
const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(webpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: path.join(__dirname, 'public'),
        compress: true,
        port: 3000,
        hot: true,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
    ],
});
