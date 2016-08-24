/* eslint-disable */

import path from 'path';
import webpack from 'webpack';
import styleLintPlugin from 'stylelint-webpack-plugin';
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
const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

const webpackConfig = {
  // eslint 配置
  eslint: {
    emitError: true, // 验证失败，终止
    configFile: '.eslintrc'
  },
  cache: true, //开启缓存，增量编译
  debug: true, //开启 debug 模式
  devtool: 'source-map', //生成 source map文件
  stats: {
    colors: true, //打印日志显示颜色
    reasons: true //打印相关被引入的模块
  },
  resolve: {
    root: [appPath],  // 设置要加载模块根路径，该路径必须是绝对路径
    //自动扩展文件后缀名
    extensions: ['', '.js', '.jsx', '.css', '.json'],
    alias: {} //设置别名
  },
  // 入口文件 让webpack用哪个文件作为项目的入口，可以设置多个
  // Multiple entry with hot loader
  // https://github.com/glenjamin/webpack-hot-middleware/blob/master/example/webpack.config.multientry.js
  entry: {
    //以 context 为基准
    index: ['./client/index.js', hotMiddlewareScript]
  },

  // 出口 让webpack把处理完成的文件放在哪里
  output: {
    // The output directory as absolute path
    path: path.join(__dirname, 'dist'),
    // The filename of the entry chunk as relative path inside the output.path directory
    filename: 'bundle.js', //文件名称
    // The output path from the view of the Javascript
    publicPath: '/__build__/'
  },

  module: {
    noParse: [], //设置不解析的文件
    // https://github.com/MoOx/eslint-loader
    preLoaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules.*!/,
      loader: 'eslint'
    }],
    loaders: [
      {
        /*
         * TC39 categorises proposals for babel in 4 stages
         * Read more http://babeljs.io/docs/usage/experimental/
         */
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: appPath,
        exclude: nodeModulesPath,
        cacheDirectory: true, // 开启缓存
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
        loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]&importLoaders=1&sourceMap!postcss-loader',
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVCLIENT__: true,
      __DEVSERVER__: false
    }),
    new styleLintPlugin({
      configFile: path.join(__dirname, '..', '.stylelintrc'),
      context: path.join(__dirname, '..', 'app'),
      files: '**!/!*.?(sa|sc|c)ss'
    })
  ],
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

//这里不能用 es2015 export 写，因为 webpack-dev-middleware 不支持
module.exports = webpackConfig;
