/**
 * 自动加载路由配置
 */

import fs from 'fs';
export default (app, options) => {
  fs.readdirSync(__dirname + '/routes').forEach((name) => {
    name = name.replace(/.js/, '');
    const obj = require('./routes/' + name);
    app.use('/api/' + name, obj);
  });
};
