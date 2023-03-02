const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BlockListGeneratorPlugin = require('./src/customWebpackPlugins/dist/BlockListGeneratorPlugin'); //Custom webpack plugin to generate static block rules json file using easyList.txt

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/index.tsx'), //main script which embeds into popup.html page
        background: path.resolve(__dirname, 'src/backgroundScript.ts'), //chrome extension background script (service worker)
        content: path.resolve(__dirname, 'src/contentScript.ts'), //content script which embeds on the webpage being browsed
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
            cleanOnceBeforeBuildPatterns: path.resolve(__dirname, 'build'),
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'popup.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public'),
                    to: path.resolve(__dirname, 'build'),
                    globOptions: {
                        ignore: [
                            path.resolve(__dirname, 'public/index.html'), //ignore copying index.html because a separate popup.html is already generated
                            path.resolve(__dirname, 'public/easyList.txt'), //ignore this blockist file from being in the main build as it is not needed and increases build size tremendously
                        ],
                    },
                },
            ],
        }),
        new BlockListGeneratorPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [
                    '/node_modules/',
                    path.resolve(__dirname, 'src/customWebpackPlugin'),
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
};
