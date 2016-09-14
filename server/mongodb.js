import mongoose from 'mongoose';
import config from './config';

/**
 * mongodb 连接数据库对象
 * @module mongodb
 * */
export default () => {
  //选项
  /*eslint-disable camelcase*/
  const options = {
    db: {native_parser: true},
    server: {poolSize: 5}// 创建连接池
  };
  //连接 mongodb
  const connect = () => {
    mongoose.connect(config.mongodb, options, (error) => {
      if (error) {
        console.error(`===>  Error connecting to ${config.mongodb} Please make sure Mongodb is installed and running!`);
        console.error(`Reason: ${error}`);
      } else {
        console.log(`===>  Succeeded in connecting to ${config.mongodb}`);
      }
    });
  };
  connect();

  //连接出错的处理
  mongoose.connection.on('error', (error) => {
    console.error('connect to %s error: ', error.message);
    //监听 mongomongodb异常后关闭闲置连接
    mongoose.connection.close();
  });

  //链接被中断后，重新链接
  mongoose.connection.on('disconnected', connect);
};
