var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]
            },
            {
                test: /\.(css|sass)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.svg$/,
                use: ["file-loader"]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css', '.sass']
    },
    devServer: {
        contentBase: './public'
    },
};
