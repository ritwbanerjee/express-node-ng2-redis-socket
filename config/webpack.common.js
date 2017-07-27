var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var helpers = require('./helpers');

module.exports = {

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [{ // ASSETS
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
                }]
            }, {
                test: /\.ts$/,
                loaders: [{
                        loader: 'awesome-typescript-loader',
                        options: { tsconfig: helpers.root('tsconfig.json') }
                    }, 'angular2-template-loader',
                    '@angularclass/hmr-loader',
                    'angular2-router-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            { // PUG
                test: /\.pug$/,
                loader: 'pug-html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
            }, {
                test: /\.scss$/,
                use: ['to-string-loader'].concat(ExtractTextPlugin
                    .extract({
                        fallbackLoader: 'style-loader',
                        loader: [
                            { loader: 'css-loader' },
                            { loader: 'sass-loader?sourceMap' },
                        ]
                    }))
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw-loader'
            }
        ]
    },

    plugins: [
        new CopyWebpackPlugin([
            { from: 'public/assets', to: 'assets' }
        ]),
        new webpack.ProvidePlugin({
            Hammer: 'hammerjs/hammer',
            jQuery: 'jquery',
            $: 'jquery',
            "window.jQuery": "jquery",
            jquery: 'jquery'
        }),
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            filetype: 'pug',
            template: 'src/index.pug'
        })
    ]
};