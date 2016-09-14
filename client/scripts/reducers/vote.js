import {combineReducers} from 'redux-immutable';
import Immutable, {Map, List} from 'immutable';
import * as types from '../constants/VoteActionTypes';
/*eslint-disable indent*/
// 需要显示 fetch 的时候
const isFetching = (
  state = Map({fetching: false}),
  action
) => {
  switch (action.type) {
    case types.GET_TOPICS_REQUEST:
      return state.set('fetching', true);
    case types.GET_TOPICS_SUCCESS:
    case types.GET_TOPICS_FAILURE:
      return state.set('fetching', false);
    default:
      return state;
  }
};

// 所有主题
const topics = (
  state = List(),
  action
) => {
  switch (action.type) {
    case types.GET_TOPICS_SUCCESS:
      return Immutable.fromJS(action.data);
    case types.CREATE_TOPIC_SUCCESS:
      return state.unshift(Immutable.fromJS(action.data));
    case types.DESTROY_TOPIC:
      return state.filter(t => t.get('id') !== action.id);
    case types.INCREMENT_COUNT:
      return state.map((item) => {
        if (item.get('id') === action.id) {
          const count = item.get('count');
          return item.set('count', count + 1);
        } else {
          return item;
        }
      });
    case types.DECREMENT_COUNT:
      return state.map((item) => {
        if (item.get('id') === action.id) {
          const count = item.get('count');
          return item.set('count', count - 1);
        } else {
          return item;
        }
      });
    default:
      return state;
  }
};

// 创建新的 topic
const newTopic = (
  state = Map({content: ''}),
  action
) => {
  switch (action.type) {
    case types.ENTER_TOPIC:
      return state.set('content', action.newTopic);
    case types.CREATE_TOPIC_REQUEST:
      return state.set('content', '');
    default:
      return state;
  }
};

const topicReducer = combineReducers({
  topics,
  isFetching,
  newTopic
});

export default topicReducer;
