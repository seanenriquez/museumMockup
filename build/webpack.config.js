// Libraries
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// Files
const utils = require('./utils')

// Configuration
module.exports = env => {

  const nodeEnv = env.NODE_ENV;

  return {
    context: path.resolve(__dirname, '../src'),
    entry: {
      app: './app.js'
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      filename: 'assets/js/[name].[hash:7].bundle.js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, '../src'),
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        modules: path.resolve(__dirname, '../node_modules'),
        source: path.resolve(__dirname, '../src'),
        images: path.resolve(__dirname, '../src/assets/images'),
        fonts: path.resolve(__dirname, '../src/assets/fonts'),
        scripts: path.resolve(__dirname, '../src/assets/scripts'),
      }
    },

    /*
      Loaders with configurations
    */
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } }
          ]
        },
        {
          test: /\.css$/,
          use: [
            nodeEnv === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true } },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            nodeEnv === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true } },
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.pug$/,
          use: [
            { loader: 'pug-loader', options: { pretty: nodeEnv !== 'production' } }
          ], 
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 3000,
            name: 'assets/images/[name].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 5000,
            name: 'assets/fonts/[name].[ext]'
          }
        }
      ]
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
      ],
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            filename: 'assets/js/vendor.[hash:7].bundle.js',
            chunks: 'all',
            test: /node_modules/
          }
        }
      }
    },

    plugins: [
      new CopyWebpackPlugin([
        { from: '../manifest.json', to: 'manifest.json' },
        { from: '../browserconfig.xml', to: 'browserconfig.xml' },
        { from: 'assets/images/favicons/android-chrome-192x192.png', to: 'assets/images/android-chrome-192x192.png' },
        { from: 'assets/images/favicons/android-chrome-256x256.png', to: 'assets/images/android-chrome-256x256.png' },
        { from: 'assets/images/favicons/apple-touch-icon.png', to: 'assets/images/apple-touch-icon.png' },
        { from: 'assets/images/favicons/favicon-16x16.png', to: 'assets/images/favicon-16x16.png' },
        { from: 'assets/images/favicons/favicon-32x32.png', to: 'assets/images/favicon-32x32.png' },
        { from: 'assets/images/favicons/favicon.ico', to: 'assets/images/favicon.ico' },
        { from: 'assets/images/favicons/mstile-150x150.png', to: 'assets/images/mstile-150x150.png' }
      ]),
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[hash:7].bundle.css',
        chunkFilename: '[id].[hash:7].css',
      }),

      /*
        Pages
      */

      // Home page
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'views/index.pug',
        inject: true
      }),

      // pages/ folder
      ...utils.pages(env),

      // pages/list folder
      ...utils.pages(env, 'list'),

      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.$': 'jquery',
        'window.jQuery': 'jquery'
      }),
      new WebpackNotifierPlugin({
        title: 'Frontend Boilerplate'
      })
    ]
  }
};
