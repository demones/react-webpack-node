import * as CacheActionType from '../constants/CacheActionTypes';

// 缓存数据，这里只标示一下缓存数据的 key 值，即把 key 设为 true，而不会真正缓存数据，读取实际数据时，还是从 state 中读取
export function addCache(cacheId, value) {
  return {
    type: CacheActionType.ADD_CACHE,
    cacheId,
    value
  };
}

//根据 Id 删除缓存
export function removeCacheById(cacheId) {
  return {
    type: CacheActionType.REMOVE_CACHE,
    cacheId
  };
}

//清空所有缓存
export function removeAllCache() {
  return {
    type: CacheActionType.REMOVE_ALL_CACHE
  };
}
