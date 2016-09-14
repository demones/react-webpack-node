/**
 * 自动加载路由配置，例如
 import film from './film';
 export default (app) => {
    app.use('/api/film', film);
  };
 */

import fs from 'fs';
export default (app, options) => {
  fs.readdir(__dirname).forEach((name) => {
    const _name = name.replace(/.js/, '');
    if (_name !== 'index') {
      const obj = require(`./${_name}`).default;
      app.use(`/api/${_name}`, obj);
    }
  });
};
