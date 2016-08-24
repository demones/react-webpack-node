/**
 * 应用配置文件
 * @type {{}}
 */

//通用配置
const baseConfig = {};

//应用配置
const appConfig = {

  //开发环境配置
  development: Object.assign({}, baseConfig, {
    waitPayUrl: ''
  }),

  //预发环境配置
  beta: Object.assign({}, baseConfig, {
    waitPayUrl: ''
  }),

  //生产环境配置
  production: Object.assign({}, baseConfig, {
    waitPayUrl: ''
  })

};

function getConfig() {
  const env = process.env.NODE_ENV || 'development';
  return Object.assign(appConfig[env], {env});
}


module.exports = getConfig();