const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const serverPublic = path.join(__dirname, 'server', 'public');

module.exports = {
    entry: './client/app.js',
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
