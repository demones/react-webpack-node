/**
 * 与应用交互接口
 * @type {{}}
 */

var request = require('request');
var async = require('async');

var utils = require('../helper/utils');

var Api = {

  /**
   * 获取什么玩意
   */
  getWaitPay : function (req,res,next) {


    //demo
    utils.remotePostJSON({})
      .then(function (data) {
        console.log(data);
        return data
      })
      .then(function (data) {
        console.log(data);
      })


    //demo
    async.series({
        one: function(callback){
          setTimeout(function(){
            callback(null, 1);
          }, 200);
        },
        two: function(callback){
          setTimeout(function(){
            callback(null, 2);
          },100);
        }
      },
      function(err, results) {
        if(err) {
          next(err)
        }else{
          req.content = results;
          next();
        }
      });

  }

}
module.exports = Api;