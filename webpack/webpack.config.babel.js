import path from 'path';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

const appPath = path.join(__dirname, '..', 'client');

export default {
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2',
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
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]&sourceMap!postcss-loader?pack=cleaner',
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?sourceMap!postcss-loader?pack=cleaner!sass-loader',
        include: path.join(appPath, 'sass', 'components', 'react-animation.scss'),
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]&sourceMap!postcss-loader?pack=cleaner!sass-loader',
        exclude: path.join(appPath, 'sass', 'components', 'react-animation.scss'),
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: 'url-loader?limit=10000'
      },
    ],
  },
  postcss: () => {
    return {
      defaults: [precss, autoprefixer],
      cleaner: [autoprefixer({browsers: ['last 2 version', 'chrome >=30', 'Android >= 4.3', 'IOS >= 8']})]
    }
  },
};
