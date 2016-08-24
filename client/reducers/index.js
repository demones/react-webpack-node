import {combineReducers} from 'redux-immutable';
import routing from './routing';
import {Map} from 'immutable';
import vote from './vote';
import film from './film';

import {
  RESET_MESSAGE, SET_MESSAGE,
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


export default combineReducers({
  routing,
  message,
  film
});
