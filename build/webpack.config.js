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
      extensions: ['.js', '.css', '.scss', '.pug'],
      alias: {
        modules: path.resolve(__dirname, '../node_modules'),
        source: path.resolve(__dirname, '../src'),
        images: path.resolve(__dirname, '../src/assets/images'),
        fonts: path.resolve(__dirname, '../src/assets/fonts'),
        styles: path.resolve(__dirname, '../src/assets/styles'),
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
          test: /\.(s?)css$/,
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
          },
          styles: {
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          },
        }
      }
    },

    plugins: [
      new CopyWebpackPlugin([
        { from: '../manifest.json', to: 'manifest.json' },
        { from: '../browserconfig.xml', to: 'browserconfig.xml' },
        { from: 'assets/icons', to: 'assets/icons' },
        { from: 'assets/fonts', to: 'assets/fonts' },
        { from: 'assets/images', to: 'assets/images' },
        { from: 'assets/videos', to: 'assets/videos' },
      ]),
      // Extract CSS
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
        inject: true,
        minify: nodeEnv === 'production' ? ({
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
        }) : false
      }),

      // pages/ folder
      ...utils.pages(env),

      // pages/ sub folders
      ...utils.pages(env, 'list'),
      ...utils.pages(env, 'news'),

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
