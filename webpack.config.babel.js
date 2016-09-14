import precss from 'precss';
import autoprefixer from 'autoprefixer';

export default {
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    modules: [
      'client',
      'node_modules',
    ],
  },
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]&sourceMap!postcss-loader?pack=cleaner',
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]&sourceMap!postcss-loader?pack=cleaner!sass-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url',
        query: {
          name: '[hash].[ext]',
          limit: 10000, // 10kb
        }
      }
    ],
  },
  postcss: () => {
    return {
      defaults: [precss, autoprefixer],
      cleaner: [autoprefixer({browsers: ['last 2 version', 'chrome >=30', 'Android >= 4.3', 'IOS >= 8']})]
    }
  },
};
