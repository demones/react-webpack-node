/**
 * 页面控制器
 * @type {{login: module.exports.login, show: module.exports.show}}
 */

var Page = {

  /**
   * 登录页面控制器
   * @param req
   * @param res
   * @param next
   */
  login : function(req,res,next){
    var content = {
      title : 'page login'
    };

    res.render('login',content);
  },

  logout : function(req,res,next){
    var content = {
      title : 'page logout'
    };

    res.clearCookie('auth');

    console.log(req.cookies);

    // res.render('login',content);

    res.json(content);
  },

  /**
   * 展示页面控制器
   * @param req
   * @param res
   * @param next
   */
  show : function(req,res,next){
    var content = {
      title : 'page show',
      content:JSON.stringify(req.content)
    };

    res.render('show',content);
  }

}
module.exports = Page;