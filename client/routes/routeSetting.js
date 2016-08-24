const routeSetting = {
  //进入一个新的路由触发的事件
  enterHandler(key) {
    console.info('enter');
  },

  // 离开一个路由触发的事件
  leaveHandler(key) {
    console.info('leave');
  }
};

let enterHandler = routeSetting.enterHandler.bind(routeSetting);
let leaveHandler = routeSetting.leaveHandler.bind(routeSetting);

export default {
  enterHandler,
  leaveHandler
};

