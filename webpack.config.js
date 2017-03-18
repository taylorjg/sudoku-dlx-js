const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const serverPublic = path.join(__dirname, 'server', 'public');

module.exports = {
    entry: ['babel-polyfill', './client/app.js', './dlxlib/dlx.js'],
    output: {
        path: serverPublic,
        filename: 'bundle.js',
    },
    plugins: [
        new CopyWebpackPlugin([
            { context: './client', from: '*.html' }
        ])
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
        contentBase: serverPublic
    }
};
