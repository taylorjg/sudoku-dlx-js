const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const packageJson = require('./package.json');

const BUILD_FOLDER = path.join(__dirname, 'build');

module.exports = {
    entry: [
        'babel-polyfill',
        './client/index.js'
    ],
    output: {
        path: BUILD_FOLDER,
        filename: 'bundle.js',
    },
    plugins: [
        new CopyWebpackPlugin([
            { context: './client', from: '*.html' },
            { context: './client', from: '*.css' }
        ]),
        new HtmlWebpackPlugin({
            template: './client/index.html',
            version: packageJson.version
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: BUILD_FOLDER
    }
};
