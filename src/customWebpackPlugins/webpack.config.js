const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    target: 'node',
    entry: path.resolve(__dirname, './BlockListGeneratorPlugin.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'BlockListGeneratorPlugin.js',
        clean: true,
        library: {
            name: 'BlockListGeneratorPlugin',
            type: 'umd', // see https://webpack.js.org/configuration/output/#outputlibrarytype
            export: 'default', // see https://github.com/webpack/webpack/issues/8480
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
            cleanOnceBeforeBuildPatterns: path.resolve(__dirname, 'dist'),
        }),
    ],
};
