const path = require('path');
const webpack = require('webpack'); //访问内置的插件
const HappyPack = require('happypack'); // 加快构建速度
const os = require('os');
const happThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
}); // 根据 CPU 设置线程数量
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装

module.exports = {
    context: path.resolve(__dirname, '../'),
    devtool: 'null', // 减少压缩代码
    entry: {
        'main': './src/app.jsx',
    },
    output: {
        path: path.resolve(__dirname, '../') + '/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                        loader: 'happypack/loader?id=happyBabel',
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: ['@babel/plugin-proposal-class-properties']
                        }
                    }]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: '',
            filename: './index.html',
            template: './src/index.html',
            inject: 'body',
            hash: true
        }),
        new HappyPack({
            id: 'happyBabel',
            cache: true,
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true',
            }],
            threadPool: happThreadPool,
            verbose: true,
        }),
    ],
    devServer: {
        contentBase: './dist'
    }
};
