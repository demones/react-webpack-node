import {
  RESET_MESSAGE, SET_MESSAGE,
  SET_TOAST, CLEAR_TOAST
} from '../constants/IndexActionTypes';

// 删除信息
export function resetMessage() {
  return {
    type: RESET_MESSAGE
  };
}

// 设置信息
export function setMessage(message) {
  return {
    type: SET_MESSAGE,
    message
  };
}

// 设置 toast，包括内容和样式
export function setToast(content, effect = 'enter', time = 1500) {
  return {
    type: SET_TOAST,
    content,
    effect,
    time,
  };
}

// 清空 toast，这里只是修改了效果，没有清空内容
export function clearToast(effect = 'leave') {
  return {
    type: CLEAR_TOAST,
    effect
  };
}
