import path from 'path';
import webpack from 'webpack';
// 用来解析下一代 css 语法 https://www.npmjs.com/package/postcss-cssnext
// http://cssnext.io/
import postcssCssnext from 'postcss-cssnext';
// PostCSS plugin to add :focus selector to every :hover
import postcssFocus from 'postcss-focus';
// 用来打印 css 警告和错误信息
import postcssReporter from 'postcss-reporter';
//PostCSS plugin to import CSS files
import postcssImprot from 'postcss-import';

const appPath = path.join(__dirname, '..', 'client');

export default {
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    modules: [
      'client',
      'node_modules',
    ],
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]&importLoaders=1&sourceMap!postcss-loader',
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: 'url-loader?limit=10000',
      },
    ],
  },
  postcss: () => [
    postcssFocus(),
    //css 中使用 import
    postcssImprot({
      path: path.join(appPath, 'styles'),
      addDependencyTo: webpack // for hot-reloading
    }),
    postcssCssnext({
      browsers: ['> 1%', 'last 2 versions', 'Android >= 4.3', 'IOS >= 8']
    }),
    postcssReporter({
      clearMessages: false,
    }),
  ],
};
