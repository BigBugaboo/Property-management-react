const path = require('path');
const webpack = require('webpack'); //访问内置的插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, '..'),
    devtool: 'cheap-module-eval-source-map', // 开启生成source-map文件功能便于代码调试
    entry: [
        path.resolve(__dirname, '../client/app.js'),
        'react-hot-loader/patch', // 开启 React 代码的模块热替换(HMR)
        'webpack-hot-middleware/client?noInfo=true&reload=true', // 当发生热更新时控制台会有提示
        'babel-polyfill',
    ],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js', // 打包后的文件名
        chunkFilename: '[name].[chunkhash:5].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        "babelrc": false,// 不采用.babelrc的配置
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                        plugins: [
                            "@babel/plugin-syntax-dynamic-import",
                            "transform-es2015-modules-commonjs",
                            [
                                "@babel/plugin-proposal-decorators",
                                {
                                    "legacy": true
                                }
                            ],
                            [
                                "@babel/plugin-proposal-class-properties",
                                {
                                    "loose": true
                                }
                            ],
                            [
                                "import",
                                {
                                    "libraryName": "antd",
                                    "style": true // `style: true` 会加载 less 文件
                                }
                                ,
                                "redux-persist"
                            ]
                        ]
                    }
                },
            ],
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },
        {
            test: /\.less$/,
            exclude: [/node_modules/], //非antd目录开启css modules
            use: [
                "style-loader",
                {
                    loader: 'css-loader',
                },
                {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true,
                        modules: true,
                        sourceMap: true,
                        localIdentName: '[local]_[hash:base64:5]'
                    }
                }
            ]
        },
        {
            test: /\.less$/,
            include: [/node_modules/], //antd目录
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true,
                        modules: true,
                        sourceMap: true,
                        localIdentName: '[local]___[hash:base64:5]'
                    }
                }
            ]
        },
        {
            test: /\.svg$/,
            use: ["file-loader"]
        },
        {
            test: /\.(jpe?g|png|gif|mp4|webm|otf|webp)$/,
            use: ['url-loader?limit=10240']
        },
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(), //代码热替换
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './client/index.html',
            inject: 'body',
            hash: true
        }),
    ],
    resolve: {
        modules: [path.resolve(__dirname, '../node_modules')],
        extensions: ['*', '.js', '.jsx', '.css', '.sass'],
        alias: {
            '@/components': path.resolve(__dirname, '..', 'client/components'),
            '@/pages': path.resolve(__dirname, '..', 'client/pages'),
            '@/layouts': path.resolve(__dirname, '..', 'client/layouts'),
            '@/utils': path.resolve(__dirname, '..', 'client/utils'),
            '@/styles': path.resolve(__dirname, '..', 'client/styles'),
            '@/assets': path.resolve(__dirname, '..', 'client/assets'),
            '@/router': path.resolve(__dirname, '..', 'client/router'),
            '@/storage': path.resolve(__dirname, '..', 'client/storage'),
            '@/stores': path.resolve(__dirname, '..', 'client/stores'),
            '@/api': path.resolve(__dirname, '..', 'client/api'),
        },
    }
};
