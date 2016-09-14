import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ManifestPlugin from './webpack-plugins/ManifestPlugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

const appPath = path.join(__dirname, 'client');

// multiple extract instances
const extractSCSS = new ExtractTextPlugin({filename: 'css/[name].[chunkhash].css', allChunks: true});
const extractCSS = new ExtractTextPlugin({filename: 'css/[name].bootstrap.[chunkhash].css', allChunks: true});


export default {
  devtool: 'hidden-source-map',

  entry: {
    index: [
      './client/scripts/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
    ]
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    modules: [
      'client',
      'node_modules',
    ],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: appPath,
        exclude: /node_modules/,
      },

      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url',
        query: {
          name: '[hash].[ext]',
          limit: 10000, // 10kb
        }
      },
      {
        test: /\.css$/,
        loader: extractCSS.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?modules&localIdentName=[hash:base64]'
        }),
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: extractSCSS.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?modules&localIdentName=[hash:base64]!postcss-loader?pack=cleaner!sass-loader'
        })
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[chunkhash].js',
    }),
    extractSCSS,
    extractCSS,
    new ManifestPlugin({
      basePath: '/',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    }),
  ],

  postcss: () => {
    return {
      defaults: [precss, autoprefixer],
      cleaner: [autoprefixer({browsers: ['last 2 version', 'chrome >=30', 'Android >= 4.3', 'IOS >= 8']})]
    }
  },
};
