import {
  HOME_INFO
} from '../constants/HomeActionTypes';

// 设置首页信息
export function setHomeInfo(info) {
  return {
    type: HOME_INFO,
    info
  };
}

