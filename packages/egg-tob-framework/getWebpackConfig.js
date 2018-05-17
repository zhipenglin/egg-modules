const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const antdTheme = require('./antdTheme');
const ENV = process.env.NODE_ENV || 'development', isProd = ENV === 'production';
const currentPath = process.cwd(),projectName=process.env.npm_package_name,port=process.env.npm_package_port,staticPort=process.env.npm_package_staticPort;
//npm_package_staticPort
//process.env.npm_package_name
module.exports = (name)=>{
    const relativePath=name||'common',distPath = path.join(currentPath, 'dist/static',relativePath);
    const plugins = [
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(currentPath, `app/view/${name||'index'}.html`),
            template: path.join(currentPath, 'app/static/index.html'),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: `js/commons.[hash:7].js`
        }),
        new webpack.DefinePlugin({
            __DEV__: ENV == 'development',
            "process.env.NODE_ENV": JSON.stringify(ENV)
        }),
        new WriteFilePlugin({
            test: /\.html$/,
            // useHashIndex: true
        }),
        new webpack.NamedModulesPlugin(),
        new WatchMissingNodeModulesPlugin('node_modules'),
    ];
    if (isProd) {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                beautify: false,
                comments: false,
                compress: {
                    warnings: false,
                    collapse_vars: true,
                    reduce_vars: true
                }
            }),
            new webpack.ContextReplacementPlugin(
                /moment[\\\/]locale$/,
                /^\.\/(zh-cn)$/
            ),
            new ExtractTextPlugin(`css/[name].[contenthash:7].css`),
            new CleanWebpackPlugin(distPath),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            })
        );
    } else {
        plugins.push(new webpack.HotModuleReplacementPlugin(), new OpenBrowserPlugin({
            url: `http://localhost:${port}/${projectName}`
        }));
    }
    const STATIC_ROOT_DIR=path.resolve(__dirname, './app/static/tob');
    return {
        entry: {
            'commons': [
                "react", "react-dom", "classnames", "react-router", "lodash"
            ],
            'index': [path.resolve(__dirname,'./app/static/public-path.js'), './app/static/index.js']
        },
        output: {
            pathinfo: true,
            path: distPath,
            filename: `js/[name].[hash:7].js`,
            chunkFilename: `js/[name].[chunkhash:7].js`,
            publicPath: isProd ? `{{static_path}}/${relativePath}` : `http://localhost:${staticPort}/static/${relativePath}`,
        },
        devtool: 'source-map',
        devServer: {
            port: staticPort,
            contentBase: './dist',
            public: `http://localhost:${staticPort}`,
            before(app) {
                app.use(function (req, res, next) {
                    res.set('Access-Control-Allow-Origin', '*');
                    next();
                });
            }
        },
        resolve: {
            // import .jsx文件免输后缀名
            extensions: ['.js', '.jsx'],
            alias: {
                'tob': path.join(currentPath, './app/static/tob/'),
                'tob-common': path.join(currentPath, './app/static/tob/js/common/components'),
                'tob-biz': path.join(currentPath, './app/static/tob/js/tob/common/components'),
                'biz': path.join(currentPath, './app/static/components/biz'),
                'filter':path.join(currentPath, './app/static/filter'),
                'common': path.join(currentPath, './app/static/components/common'),
                '@js': path.resolve(STATIC_ROOT_DIR, 'js'),

                '@js-common': path.resolve(STATIC_ROOT_DIR, 'js/common'),
                '@js-common-components': path.resolve(STATIC_ROOT_DIR, 'js/common/components'),
                '@js-tob': path.resolve(STATIC_ROOT_DIR, 'js/tob'),
                '@js-tob-common': path.resolve(STATIC_ROOT_DIR, 'js/tob/common'),
                '@js-tob-common-components': path.resolve(STATIC_ROOT_DIR, 'js/tob/common/components'),
                '@scss': path.resolve(STATIC_ROOT_DIR, 'scss'),
                '@scss-common': path.resolve(STATIC_ROOT_DIR, 'scss/common'),
                '@scss-tob': path.resolve(STATIC_ROOT_DIR, 'scss/tob'),
                '@scss-tob-common': path.resolve(STATIC_ROOT_DIR, 'scss/tob/common'),
                '@img': path.resolve(STATIC_ROOT_DIR, 'img'),
                '@img-common': path.resolve(STATIC_ROOT_DIR, 'img/common'),
                '@img-tob': path.resolve(STATIC_ROOT_DIR, 'img/tob'),
                '@fonts': path.resolve(STATIC_ROOT_DIR, 'img/fonts')
            },
        },
        module: {
            rules: [
                {
                    parser: {
                        requireEnsure: false
                    }
                },
                {
                    oneOf: [
                        {
                            test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
                            loader: 'url-loader',
                            options: {
                                limit: 10000, // 10K 以下
                                name: `[name].[hash:8].[ext]`,
                            },
                        },

                        {
                            test: /\.(js|jsx)$/,
                            include: path.join(currentPath, 'app/static'),
                            exclude: [
                                path.join(currentPath, 'app/static/thirdsrc'),
                                /(node_modules)|(third-party\/es5)|(third-party\\es5)|(third-party\/piwik)|(third-party\\piwik)/
                            ],
                            use: [
                                {
                                    loader: 'ic-customize-loader',
                                    options: {
                                        rules: [
                                            {
                                                test: /@p@([./])/g,
                                                value:`${name}$1`
                                            }
                                        ]
                                    }
                                },
                                {
                                    loader: 'babel-loader',
                                    options:{
                                        babelrc: false,
                                        comments: false,
                                        presets: [
                                            require.resolve('babel-preset-env'),
                                            require.resolve('babel-preset-react')
                                        ],
                                        plugins:[
                                            [require.resolve('babel-plugin-import'),{
                                                "libraryName": "antd",
                                                "style":true
                                            }],
                                            require.resolve('babel-plugin-transform-runtime'),
                                            require.resolve('babel-plugin-tob-transform'),
                                            require.resolve('babel-plugin-transform-class-properties'),
                                            require.resolve('babel-plugin-transform-object-rest-spread'),
                                            require.resolve('babel-plugin-syntax-dynamic-import'),
                                            require.resolve('babel-plugin-transform-decorators-legacy'),
                                            require.resolve('babel-plugin-add-module-exports')
                                        ]
                                    }
                                }
                            ]

                        },

                        {
                            test: /\.(scss|css)$/,
                            use: isProd ? ExtractTextPlugin.extract({
                                fallback: 'style-loader',
                                publicPath: '../',
                                use: [
                                    'css-loader',
                                    {
                                        loader: 'postcss-loader',
                                        options: {
                                            plugins: () => [
                                                require('postcss-flexbugs-fixes'),
                                                require('autoprefixer')({
                                                    browsers: [
                                                        '>1%',
                                                        'last 4 versions',
                                                        'Firefox ESR',
                                                        'not ie < 9', // React doesn't support IE8 anyway
                                                    ],
                                                    flexbox: 'no-2009',
                                                }),
                                            ],
                                        },
                                    },
                                    "sass-loader"
                                ]
                            }) : [
                                'style-loader',
                                'css-loader',
                                {
                                    loader: 'postcss-loader',
                                    options: {
                                        plugins: () => [
                                            require('postcss-flexbugs-fixes'),
                                            require('autoprefixer')({
                                                browsers: [
                                                    '>1%',
                                                    'last 4 versions',
                                                    'Firefox ESR',
                                                    'not ie < 9', // React doesn't support IE8 anyway
                                                ],
                                                flexbox: 'no-2009',
                                            }),
                                        ],
                                    },
                                },
                                "sass-loader"
                            ],
                        },
                        {
                            test: /\.(less)$/,
                            use: isProd ? ExtractTextPlugin.extract({
                                fallback: 'style-loader',
                                publicPath: '../',
                                use: [
                                    'css-loader',
                                    {
                                        loader: 'postcss-loader',
                                        options: {
                                            plugins: () => [
                                                require('postcss-flexbugs-fixes'),
                                                require('autoprefixer')({
                                                    browsers: [
                                                        '>1%',
                                                        'last 4 versions',
                                                        'Firefox ESR',
                                                        'not ie < 9', // React doesn't support IE8 anyway
                                                    ],
                                                    flexbox: 'no-2009',
                                                }),
                                            ],
                                        },
                                    },
                                    `less-loader?{"modifyVars":${JSON.stringify(antdTheme)}}`
                                ]
                            }) : [
                                'style-loader',
                                'css-loader',
                                {
                                    loader: 'postcss-loader',
                                    options: {
                                        plugins: () => [
                                            require('postcss-flexbugs-fixes'),
                                            require('autoprefixer')({
                                                browsers: [
                                                    '>1%',
                                                    'last 4 versions',
                                                    'Firefox ESR',
                                                    'not ie < 9', // React doesn't support IE8 anyway
                                                ],
                                                flexbox: 'no-2009',
                                            }),
                                        ],
                                    },
                                },
                                `less-loader?{"modifyVars":${JSON.stringify(antdTheme)}}`
                            ],
                        },
                        {
                            test: /\.html$/,
                            use: [{
                                loader: 'html-loader',
                                options: {
                                    minimize: true
                                }
                            }],
                        },
                        {
                            exclude: [/\.js$/, /\.html$/, /\.json$/],
                            loader: require.resolve('file-loader'),
                            options: {
                                name: `[name].[hash:8].[ext]`,
                            },
                        },
                    ],
                }
            ],
        },
        plugins: plugins
    }
};
