/**
 * 应用配置文件，配置mongodb 等相关参数
 * @type {{}}
 */

//通用配置
const baseConfig = {};

//应用配置
const appConfig = {
  //开发环境配置
  development: {
    ...baseConfig,
    /**
     * Cookie 密钥
     */
    cookieSecret: 'react-webpack-node',

    /**
     * session 密钥
     */
    sessionSecret: 'react-webpack-node, very secret',

    /**
     * 连接mongodb 相关配置
     * mongodb://user:pass@localhost:port,anotherhost:port,yetanother:port/mydatabase
     * mongodb://hostA:27501,hostB:27501
     */
    mongodb: 'mongodb://localhost:27017/react-webpack-node',
  },

  //预发环境配置
  beta: {
    ...baseConfig
  },

  //生产环境配置
  production: {
    ...baseConfig
  }
};

function getConfig() {
  const env = process.env.NODE_ENV || 'development';
  return {
    ...appConfig[env],
    env
  };
}

export default getConfig();
