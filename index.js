/**
 * Entry Script
 */

if (process.env.NODE_ENV === 'production') {

} else {
  // Babel polyfill to convert ES6 code in runtime
  require('babel-register')({
    plugins: [
      [
        'babel-plugin-webpack-loaders',
        {
          config: './webpack/webpack.config.babel.js',
          verbose: false
        }
      ]
    ]
  });
  require('babel-polyfill');

  require('./server/index');
}
