const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src/index.ts'),
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
    devtool: 'inline-source-map',
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
        extensions: ['.tsx', '.ts', '.js'],
    },
};
