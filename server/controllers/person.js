import moment from 'moment';
import Person from '../models/Person';
import Pagination from '../helper/Pagination';

/**
 * 分页显示
 * 该查询比较复杂，由于mongodb不支持多表关联查询，所以需要自己写代码实现
 * 主要用到了异步 promise 来分别查询关联的字段，最后利用键值处理
 * @method
 */
export function paging(req, res) {
  const {currentPage} = req.query;
  let {pageSize} = req.query;
  const pagination = new Pagination({pageSize, currentPage});
  pageSize = pagination.data.pageSize;
  const skip = pageSize * (currentPage - 1);
  const limit = pageSize;
  const promise = Person.count({}).exec();

  promise.then((totalCount) => {
    pagination.setOptions({totalCount});
    return Person.find({},
      {
        _id: 1,
        firstName: 1,
        lastName: 1,
        createdDate: 1,
        updatedDate: 1,
      },
      {skip, limit, sort: {createdDate: -1}});
  }).then((items) => {
    const _items = items.map((item) => {
      item.createdDate = moment(item.createdDate).format('YYYY年MM月DD HH:mm:ss');
      item.updatedDate = moment(item.updatedDate).format('YYYY年MM月DD HH:mm:ss');
      return item;
    });
    pagination.setItems(_items);
    return res.json(pagination);
  }).then(null, (err) => {
    pagination.setError({message: err.message});
    return res.json(pagination);
  });
}

/**
 * 增加或修改 Person
 */
export function save(req, res) {
  const person = req.body;
  const {_id} = person;
  if (_id) { //修改
    const query = {_id};
    delete person.createdDate;
    person.updatedDate = new Date();
    Person.findOneAndUpdate(query, person, (err) => {
      if (err) {
        return res.json({
          success: false,
          message: err.message
        });
      }
      return res.json({
        success: true
      });
    });
  } else { // 增加
    Person.create(person, (err, person) => {
      if (err) {
        return res.json({
          success: false,
          message: err.message
        });
      }

      return res.json({
        success: true,
        data: person._doc
      });
    });
  }
}

/**
 * Remove Person
 */
export function remove(req, res) {
  const {_id} = req.body;
  Person.findOneAndRemove({_id}, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }
    return res.json({
      success: true,
    });
  });
}

export default {
  paging,
  save,
  remove
};
