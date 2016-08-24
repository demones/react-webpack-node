/**
 * 用户权限校验
 */

'use strict';

module.exports = {
  isLogin: function (req, res, next) {
    if(!req.cookies.auth){
      res.redirect('/index/login');
    }else{
      next();
    }
  }
};

