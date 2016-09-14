import {combineReducers} from 'redux-immutable';
import routing from './routing';
import {Map} from 'immutable';
import cache from './cache';
import person from './person';
import film from './film';
import vote from './vote';

import {
  RESET_MESSAGE, SET_MESSAGE,
  SET_TOAST, CLEAR_TOAST
} from '../constants/IndexActionTypes';

function message(state = Map(), action) {
  const {type, error} = action;
  if (type === RESET_MESSAGE) {
    return state.clear();
  } else if (type === SET_MESSAGE) {
    return state.set('content', action.message);
  } else if (error) {
    return state.set('content', error);
  }
  return state;
}

// 设置 toast 内容和效果
function toast(state = Map(), action) {
  const {type, content, effect, error} = action;
  if (type === CLEAR_TOAST) {
    return state.set('effect', effect);
  } else if (type === SET_TOAST) {
    return state.set('content', content).set('effect', effect);
  } else if (error) {
    return state.set('content', error).set('effect', 'enter');
  }
  return state;
}

export default combineReducers({
  routing,
  message,
  toast,
  cache,
  film,
  person,
  vote
});
