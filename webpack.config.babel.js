// Libraries
import { resolve as _resolve } from 'path';
import { ProvidePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin, {
  loader as _loader,
} from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import * as fs from 'fs';

// Configuration
export default (env) => {
  const nodeEnv = env.NODE_ENV;

  const pages = () => {
    const viewsFolder = _resolve(__dirname, 'src/views/pages');
    const allPages = [];

    fs.readdirSync(viewsFolder).forEach((view) => {
      const [viewName, viewExt] = view.split(/\.(?=[^.]+$)/);
      if (viewExt && viewExt === 'pug') {
        const options = {
          filename: `${viewName}.html`,
          template: `views/pages/${view}`,
          inject: true,
          minify:
            nodeEnv === 'production'
              ? {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
              }
              : false,
        };
        allPages.push(new HtmlWebpackPlugin(options));
      }
    });
    return allPages;
  };

  return {
    context: _resolve(__dirname, './src'),
    entry: {
      app: './app.js',
    },
    output: {
      path: _resolve(__dirname, './dist'),
      publicPath: '',
      filename: 'assets/js/[name].[hash:7].bundle.js',
    },
    devServer: {
      contentBase: _resolve(__dirname, './src'),
      port: 8080,
    },
    performance: {
      maxAssetSize: 512000,
      maxEntrypointSize: 512000,
    },
    resolve: {
      extensions: ['.js', '.css', '.scss', '.pug'],
      alias: {
        modules: _resolve(__dirname, './node_modules'),
        source: _resolve(__dirname, './src'),
        images: _resolve(__dirname, './src/assets/images'),
        fonts: _resolve(__dirname, './src/assets/fonts'),
        styles: _resolve(__dirname, './src/assets/styles'),
        scripts: _resolve(__dirname, './src/assets/scripts'),
      },
    },

    /*
      Loaders with configurations
    */
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: { presets: ['@babel/preset-env'] },
            },
            'eslint-loader',
          ],
        },
        {
          test: /\.(s?)css$/,
          use: [
            nodeEnv === 'development' ? 'style-loader' : _loader,
            {
              loader: 'css-loader',
              options: { importLoaders: 1, sourceMap: true },
            },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        },
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'pug-loader',
              options: { pretty: nodeEnv !== 'production' },
            },
          ],
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 5000,
            name: 'assets/fonts/[name].[ext]',
          },
        },
        {
          test: /\.(ico)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 1000,
            name: 'assets/icons/[name].[ext]',
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 3000,
            name: 'assets/images/[name].[ext]',
          },
        },
        {
          test: /\.(mp4|ogg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: false,
            name: 'assets/videos/[name].[ext]',
          },
        },
      ],
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
            test: /node_modules/,
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
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
        minify:
          nodeEnv === 'production'
            ? {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true,
            }
            : false,
      }),

      // pages/ folder
      ...pages(),

      new ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.$': 'jquery',
        'window.jQuery': 'jquery',
      }),

      new WebpackNotifierPlugin({
        title: 'Frontend Boilerplate',
      }),
    ],
  };
};
