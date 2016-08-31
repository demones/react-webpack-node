import {
  PERSON_REQUEST, PERSON_SUCCESS, PERSON_FAILURE, PERSON_CLEAN,
  PERSON_UPDATE, PERSON_DELETE
} from '../constants/PersonActionTypes';
import {CALL_API} from '../middlewares/api';

function fetchPersonList(currentPage) {
  return {
    [CALL_API]: {
      types: {
        request: PERSON_REQUEST,
        success: PERSON_SUCCESS,
        failure: PERSON_FAILURE
      },
      url: `person/list?currentPage=${currentPage}`,
    }
  };
}

//获取 person 分页列表
export function getPersonList() {
  return (dispatch, getState) => {
    const person = getState().get('person');
    const isFetching = person.get('isFetching');
    const entities = person.get('entities');
    //请求页码
    const currentPage = entities ? entities.get('currentPage') + 1 : 1;
    //最后一页
    const lastPage = entities ? entities.get('lastPage') : false;

    if (isFetching || lastPage) {
      return null;
    }
    return dispatch(fetchPersonList(currentPage));
  };
}

//清空数据
export function cleanPersonList() {
  return {
    type: PERSON_CLEAN,
    entity: 'personPagination',
    clean: true
  }
}

//修改
export function updatePerson(person) {
  return {
    type: PERSON_UPDATE,
    person
  };
}

//删除
export function deletePerson(id) {
  return {
    type: PERSON_DELETE,
    id
  };
}

