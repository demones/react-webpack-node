import process from './process';
import * as PersonActionTypes from '../constants/PersonActionTypes';

const {
  PERSON_REQUEST, PERSON_SUCCESS, PERSON_FAILURE, PERSON_CLEAN, PERSON_UPDATE, PERSON_DELETE
} = PersonActionTypes;

/**
 * customTypes 根据实际业务需求自定义 reducer
 */
const person = process({
  types: {
    request: PERSON_REQUEST,
    success: PERSON_SUCCESS,
    failure: PERSON_FAILURE,
    clean: PERSON_CLEAN
  },
  customTypes: {
    [PERSON_UPDATE]: (state, action) => {
      /*let {ids, entity} = state;
       const _entity = assign({}, entity);
       _entity[action.person.id] = assign({}, action.person, action.person);

       const _state = assign({}, state, {
       ids: assign([], ids),
       entity
       });*/
      return state;
    },
    [PERSON_DELETE]: (state, action) => {
      /*let {ids, entity} = state;
       const _entity = assign({}, entity);
       delete _entity[action.id];

       const _state = assign({}, state, {
       ids: ids.filter((person) => person !== action.id),
       entity: _entity
       });*/
      return state;
    }
  }
});

export default person;
