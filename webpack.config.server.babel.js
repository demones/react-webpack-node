import path from 'path';
import ExternalsPlugin from './webpack-plugins/ExternalsPlugin';
const nodeModulesPath = path.join(__dirname, 'node_modules');

export default {

  entry: './server/index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs'
  },

  target: 'node',

  node: {
    __filename: true,
    __dirname: true,
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    modules: [
      'client',
      'node_modules',
    ],
  },

  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules.*!/,
      loader: 'eslint'
    }],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: nodeModulesPath,
        query: {
          plugins: [
            [
              'babel-plugin-webpack-loaders',
              {
                config: './webpack.config.babel.js',
                verbose: false
              }
            ]
          ]
        },
      }
    ],
  },
  plugins: [
    new ExternalsPlugin({
      type: 'commonjs',
      include: nodeModulesPath
    }),
  ],
  // eslint 配置
  eslint: {
    emitError: true, // 验证失败，终止
    configFile: '.eslintrc'
  },
};
