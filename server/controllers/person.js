import Person from '../models/Person';
import DataPage from '../helper/DataPage';

/**
 * 分页显示
 * 该查询比较复杂，由于mongodb不支持多表关联查询，所以需要自己写代码实现
 * 主要用到了异步 promise 来分别查询关联的字段，最后利用键值处理
 * @method
 */
export function paging(req, res) {
  console.info(req);
  const {pageSize, currentPage} = req.body;
  const skip = pageSize * (currentPage - 1);
  const limit = pageSize;

  const dataPage = new DataPage({pageSize, currentPage});
  const promise = Person.count({}).exec();

  promise.then((totalCount) => {
    dataPage.setPageOptions({totalCount});
    return Person.find({}, {
        _id: 1,
        firstName: 1,
        lastName: 1,
        remark: 1,
        createdDate: 1,
        updatedDate: 1,
      },
      {skip, limit, sort: {createdDate: -1}});
  }).then((items) => {
    dataPage.setPageOptions({items});
    return res.json(dataPage);
  }).then(null, function (err) {
    console.log('Error in first query');
    return res.status(500).send('Something went wrong getting the data');
  });
}

/**
 * 增加或修改 Person
 */
export function save(req, res) {
  const {id} = req.body;
  if (id) { //修改
    const query = {id};
    Person.findOneAndUpdate(query, req.body, (err) => {
      if (err) {
        console.log('Error on save!');
        return res.status(500).send('We failed to save for some reason');
      }

      return res.status(200).send('Updated successfully');
    });
  } else { // 增加
    Person.create(req.body, (err) => {
      if (err) {
        console.log(err);
        return res.status(400).send(err);
      }

      return res.status(200).send('OK');
    });
  }

}

/**
 * Remove Person
 */
export function remove(req, res) {
  const {id} = req.body;
  Person.findOneAndRemove({id}, (err) => {
    if (err) {
      console.log('Error on delete');
      return res.status(500).send('We failed to delete for some reason');
    }

    return res.status(200).send('Removed Successfully');
  });
}

export default {
  paging,
  save,
  remove
};
