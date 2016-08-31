/**
 * 自动加载路由配置，例如
 import film from './film';
 export default (app) => {
    app.use('/api/film', film);
  };
 */

import fs from 'fs';
export default (app, options) => {
  fs.readdirSync(__dirname).forEach((name) => {
    name = name.replace(/.js/, '');
    if (name !== 'index') {
      const obj = require('./' + name).default;
      app.use('/api/' + name, obj);
    }
  });
};
