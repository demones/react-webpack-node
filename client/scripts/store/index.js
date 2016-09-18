import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import api from '../middlewares/api';

export default function configureStore(history, initialState) {
  const middleware = [thunk, api, routerMiddleware(history)];

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
}
