import * as types from '../constants/VoteActionTypes';
import callApi from '../utils/fetch';

// 投票主题
export function enterTopic(content) {
  return {
    type: types.ENTER_TOPIC,
    newTopic: content
  };
}

/*
 * 创建投票请求
 * @param data
 */
function createTopicRequest() {
  return {
    type: types.CREATE_TOPIC_REQUEST
  };
}

// 成功
function createTopicSuccess(data) {
  return {
    type: types.CREATE_TOPIC_SUCCESS,
    data
  };
}

// 失败
function createTopicFailure(error) {
  return {
    type: types.CREATE_TOPIC_FAILURE,
    error
  };
}

// 创建 topic
export function createTopic(content) {
  return (dispatch, getState) => {
    // 如果为空则返回
    if (content.trim().length <= 0) {
      return;
    }

    const state = getState();
    const vote = state.get('vote');

    // First dispatch an optimistic update
    dispatch(createTopicRequest());

    callApi({
      url: 'vote/topic', body: {
        count: 1,
        content
      }, options: {
        method: 'post'
      }
    }).then((res) => {
      return dispatch(createTopicSuccess(res.data));
    }, (error) => {
      return dispatch(createTopicFailure(error));
    });
  };
}

// Fetch all Topic
export function fetchTopics() {
  return (dispatch, getState) => {

    dispatch(fetchTopicsRequest());

    callApi({url: 'vote/topics'}).then((res) => {
      return dispatch(fetchTopicsSuccess(res.data));
    }, (error) => {
      return dispatch(fetchTopicsFailure(error));
    });
  };
}

function fetchTopicsRequest() {
  return {
    type: types.GET_TOPICS_REQUEST,
  }
}

function fetchTopicsSuccess(data) {
  return {
    type: types.GET_TOPICS_SUCCESS,
    data
  }
}

function fetchTopicsFailure(error) {
  return {
    type: types.GET_TOPICS_FAILURE,
    error
  }
}

//投票
export function incrementCount(id) {
  return (dispatch, getState) => {
    callApi({
      url: 'vote/count', body: {
        id,
        type: 'increment'
      }, options: {method: 'put'}
    }).then((res) => {
      return dispatch({
        type: types.INCREMENT_COUNT,
        id
      });
    }, (error) => {

    });
  };
}

//减票
export function decrementCount(id) {
  return (dispatch, getState) => {
    callApi({
      url: 'vote/count', body: {
        id,
        type: 'decrement'
      }, options: {method: 'put'}
    }).then((res) => {
      return dispatch({
        type: types.DECREMENT_COUNT,
        id
      });
    }, (error) => {

    });
  };
}

//删除主题
export function destroyTopic(id) {
  return (dispatch, getState) => {
    callApi({
      url: `vote/topic/${id}`,
      options: {method: 'delete'}
    }).then((res) => {
      return dispatch({
        type: types.DESTROY_TOPIC,
        id
      });
    }, (error) => {

    });
  };
}
