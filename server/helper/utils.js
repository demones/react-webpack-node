/**
 * 基础的工具方法
 * @type {request}
 */
var request = require('request');
var Promise = require('bluebird');

exports.remotePostJSON = function(options) {
  return new Promise(function(resolve, reject){
    request.post(
      {
        url: options.url,
        json: options.data || {}
      },
      function(err, response, body){
        if ( err ) {
          reject(err);
        } else {
          if ( body.resultCode === 0 ) {
            resolve(body);
          } else {
            console.log(
              '请求外部接口失败，外部URL：' +
              options.url  + ' 发送：' +
              JSON.stringify(options.data) +
              ' 返回：' + JSON.stringify(body)
            )
            reject(body);
          }
        }
      }
    );
  });
}

/**
 * get获取json数据
 * @param url
 */
exports.remoteGetJSON = function(url) {
  return new Promise(function(resolve, reject){
    request.get({
        url: url,
        json: {}
      },
      function(err, response, body){
        if ( err ) {
          reject(err);
        } else {
          resolve(body);
        }
      }
    );
  });
}