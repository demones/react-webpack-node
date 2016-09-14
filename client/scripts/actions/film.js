import * as FilmActionTypes from '../constants/FilmActionTypes';
import {CALL_API} from '../middlewares/api';

const {
  ALL_FILM_REQUEST, ALL_FILM_SUCCESS, ALL_FILM_FAILURE, ALL_FILM_CLEAN,
  POPULARITY_FILM_REQUEST, POPULARITY_FILM_SUCCESS, POPULARITY_FILM_FAILURE, POPULARITY_FILM_CLEAN
} = FilmActionTypes;

/*eslint-disable indent*/
function fetchFilmList(type = 'all') {
  switch (type) {
    case 'all':
      return {
        [CALL_API]: {
          types: {
            request: ALL_FILM_REQUEST,
            success: ALL_FILM_SUCCESS,
            failure: ALL_FILM_FAILURE
          },
          url: 'film/all'
        }
      };
    case 'popularity':
      return {
        [CALL_API]: {
          types: {
            request: POPULARITY_FILM_REQUEST,
            success: POPULARITY_FILM_SUCCESS,
            failure: POPULARITY_FILM_FAILURE
          },
          url: 'film/popularity',
        }
      };
    default:
      return null;
  }
}

//返回电影列表
export function getFilmList(type) {
  return (dispatch, getState) => {
    return dispatch(fetchFilmList(type));
  };
}

//如果不传入 type 表示清空所有，否则根据传入的 type 来清空
export function cleanFilmList(type) {
  const types = ['all', 'popularity'];

  return (dispatch, getState) => {
    if (type) {
      dispatch({
        type: FilmActionTypes[`${type.toUpperCase()}_FILM_CLEAN`]
      });
    } else {
      dispatch({
        type: ALL_FILM_CLEAN
      });
      dispatch({
        type: POPULARITY_FILM_CLEAN
      });
    }
  };
}

