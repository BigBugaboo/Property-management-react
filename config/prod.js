const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinCssExtractPlugin = require('mini-css-extract-plugin');
const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
    entry: {
        main: path.join(__dirname, '../client/app.js'), //入口文件
        vendor: [
            'react',
            'react-dom',
            'react-router-dom',
        ] //分离第三方库
    },
    output: {
        filename: '[name].[chunkhash:5].js', //打包后的文件名
        chunkFilename: '[name].[chunkhash:5].js',
        path: path.join(__dirname, '../build'), //打包后的文件存储位置
        publicPath: '/' //此处上线部署再改，对应的是服务器上存储打包后文件的路径
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: { // 单独提取JS文件引入html
                "antd-vendor": {
                    chunks: 'initial',
                    test: (module) => (/antd/.test(module.context)),
                    name: 'antd',
                    priority: 2,
                    reuseExistingChunk: false,
                    enforce: true
                },
            }
        }
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
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
                }
            ],
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader?minimize=true&modules&localIdentName=[local]-[hash:base64:5]',
            ],
            exclude: /node_modules/
        },
        {
            test: /\.scss$/,
            use: [
                "style-loader",
                MinCssExtractPlugin.loader,
                "css-loader",
                "sass-loader",
            ],
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
            include: /node_modules/
        },
        {
            test: /\.less$/,
            exclude: [/node_modules/], //非antd目录开启css modules
            use: [
                "style-loader",
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        modules: true,
                        sourceMap: true,
                        localIdentName: '[local]_[hash:base64:5]'
                    }
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
            test: /\.(jpe?g|png|gif|mp4|webm|otf|webp)$/,
            use: ['url-loader?limit=10240?outputPath=static/']
        },
        {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: 'file-loader?outputPath=static/'
        },
        {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: 'file-loader?outputPath=static/'
        }
        ],
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(), //报错时不退出webpack进程
        new webpack.optimize.ModuleConcatenationPlugin(),//开启webpack3范围提升
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"' //用于区分开发和生产环境
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ //自动生成html
            template: path.join(__dirname, '../client/index.html'),
            chunksSortMode: 'dependency'
        }),
        new MinCssExtractPlugin({
            filename: "[name].css"
        }), //提取css文件
        new Visualizer() //打包后可生成一个html文件,直接打开可看到打包文件的具体信息(包含各个模块的比重)
    ],
    resolve: {
        modules: [path.resolve(__dirname, '../node_modules')],
        extensions: ['*', '.js', '.jsx', '.css', '.sass'],
        mainFields: ['jsnext:main', 'main'],
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
