import path from 'path';
import webpack from 'webpack';
//https://github.com/stylelint/stylelint/blob/master/docs/user-guide.md
import styleLintPlugin from 'stylelint-webpack-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

const appPath = path.join(__dirname, 'client');
const nodeModulesPath = path.join(__dirname, 'node_modules');

const webpackConfig = {
  cache: true, //开启缓存，增量编译
  debug: true, //开启 debug 模式
  devtool: 'cheap-module-eval-source-map', //生成 source map文件
  resolve: {
    //自动扩展文件后缀名
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    modules: [
      'client',
      'node_modules',
    ],
  },
  // 入口文件 让webpack用哪个文件作为项目的入口，可以设置多个
  // Multiple entry with hot loader
  // https://github.com/glenjamin/webpack-hot-middleware/blob/master/example/webpack.config.multientry.js
  entry: {
    index: [
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './client/scripts/index.js',
    ]
  },

  // 出口 让webpack把处理完成的文件放在哪里
  output: {
    // The output directory as absolute path
    path: path.join(__dirname, 'dev'),
    // The filename of the entry chunk as relative path inside the output.path directory
    filename: '[name].js', //文件名称
    // The output path from the view of the Javascript
    publicPath: '/dev/'
  },

  module: {
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
        loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]&sourceMap!postcss-loader?pack=cleaner',
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]&sourceMap!postcss-loader?pack=cleaner!sass-loader',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        'NODE_ENV': JSON.stringify('development'),
      }
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      /**
       * 在这里引入 manifest 文件
       */
      manifest: require('./dev/vendor-manifest.json')
    }),
    new styleLintPlugin({
      configFile: path.join(__dirname, '.stylelintrc'),
      context: path.join(__dirname, 'client', 'sass'),
      files: '**/*.scss'
    })
  ],
  postcss: () => {
    return {
      defaults: [precss, autoprefixer],
      cleaner: [autoprefixer({browsers: ['last 2 version', 'chrome >=30', 'Android >= 4.3', 'IOS >= 8']})]
    }
  },
  // eslint 配置
  eslint: {
    emitError: true, // 验证失败，终止
    configFile: '.eslintrc'
  },
};


//这里不能用 es2015 export 写，因为 webpack-dev-middleware 不支持
module.exports = webpackConfig;
