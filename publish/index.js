process.env.NODE_ENV = 'production';
process.env.webpackAssets = JSON.stringify(require('./client/manifest.json'));
// In production, serve the webpacked server file.
require('./server/server.bundle.js');
