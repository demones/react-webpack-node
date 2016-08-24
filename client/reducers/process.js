import {List, Map} from 'immutable';

/*eslint-disable indent*/
/**
 * 加工处理action 拿到的数据
 * @param types reducer 对应的 Types
 * @param customTypes 自定义 type
 * @param paging 是否为分页
 * @returns {processData}
 */
function process({types, customTypes, paging}) {
  const {request, success, failure, clean} = types;
  const customTypesArray = customTypes ? Object.keys(customTypes) : [];

  // 加工数据，相当于平时直接在 reducer 中处理，这是这里统一封装了 request success failure 等
  function processByFetchType(state, action) {
    switch (action.type) {
      case request:
        return state.set('isFetching', true);
      case success: {
        /**
         * entities 设置 fetch 请求的数据
         */
        const {data} = action;
        let _state = state.set('isFetching', false);
        let entities = state.get('entities');
        if (!entities) {
          entities = Array.isArray(data) ? List(data) : Map(data)
        } else {
          entities.merge(Array.isArray(data) ? List(data) : Map(data));
        }
        return _state.set('entities', entities);
      }
      case failure:
        return state.set('isFetching', false);
      default:
        return state;
    }
  }

  /**
   * 处理数据
   */
  return function processData(state = paging ? Map({
    isFetching: false,
    pageNum: 1 //当前页
  }) : Map({
    isFetching: false
  }), action) {
    // 处理自定义的 types
    if (customTypesArray.indexOf(action.type) !== -1) {
      return customTypes[action.type](state, action);
    }

    switch (action.type) {
      // 清空数据
      case clean:
        return paging ? state.set('pageNum', 1).delete('entities') : state.delete('entities');
      // 处理请求结果
      case request:
      case success:
      case failure: {
        return processByFetchType(state, action);
      }
      default:
        return state;
    }
  };
}

export default process;
