import {Map} from 'immutable';
import * as CacheActionType from '../constants/CacheActionTypes';

/*eslint-disable indent*/
export default function caches(state = Map(), action) {
  switch (action.type) {
    case CacheActionType.ADD_CACHE:
      return state.set(action.cacheId, action.value === undefined ? true : action.value);
    case CacheActionType.REMOVE_CACHE:
      return state.delete(action.cacheId);
    case CacheActionType.REMOVE_ALL_CACHE:
      return state.clear();
    default:
      return state;
  }
}
