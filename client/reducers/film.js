import {combineReducers} from 'redux-immutable';
import process from './process';
import * as FilmActionTypes from '../constants/FilmActionTypes';

const {
  ALL_FILM_REQUEST, ALL_FILM_SUCCESS, ALL_FILM_FAILURE, ALL_FILM_CLEAN,
  POPULARITY_FILM_REQUEST, POPULARITY_FILM_SUCCESS, POPULARITY_FILM_FAILURE, POPULARITY_FILM_CLEAN
} = FilmActionTypes;

const film = combineReducers({
  allFilmList: process({
    types: {
      request: ALL_FILM_REQUEST,
      success: ALL_FILM_SUCCESS,
      failure: ALL_FILM_FAILURE,
      clean: ALL_FILM_CLEAN
    }
  }),
  popularityFilmList: process({
    types: {
      request: POPULARITY_FILM_REQUEST,
      success: POPULARITY_FILM_SUCCESS,
      failure: POPULARITY_FILM_FAILURE,
      clean: POPULARITY_FILM_CLEAN
    }
  })
});

export default film;
