import Vote from '../models/Vote';

/**
 * 增加一个主题
 */
export function topic(req, res) {
  const vote = req.body;
  Vote.create(vote, (err, vote) => {
    if (err) {
      return res.json({
        success: false,
        message: err.message
      });
    }

    const data = vote._doc;
    data.id = data._id;
    delete data.__v;
    delete data._id;
    return res.json({
      success: true,
      data
    });
  });

}

/**
 * 返回所有投票列表
 */
export function topics(req, res) {
  Vote.find({},
    {
      _id: 1,
      count: 1,
      content: 1,
      createdDate: 1,
      updatedDate: 1,
    },
    {sort: {createdDate: -1}}, (err, votes) => {
      if (err) {
        return res.json({
          success: false,
          message: err.message
        });
      }

      const data = votes.map((item) => {
        // 这里需要用 item._doc 来处理，而不能直接使用 item
        const _item = item._doc;
        _item.id = _item._id;
        delete _item._id;
        return _item;
      });

      //如果不想用 _id，可以利用自定义主键，或者把结果中的_id 改成 id
      return res.json({
        success: true,
        data
      });
    });
}

/**
 * 投票或减票
 */
export function voteCount(req, res) {
  const vote = req.body;
  const {id, type} = vote;
  Vote.findOneAndUpdate({_id: id}, {
    $inc: {count: type === 'increment' ? 1 : -1}
  }, (err) => {
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
}

/**
 * 删除 topic
 */
export function removeTopic(req, res) {
  const {id} = req.params;
  Vote.remove({_id: id}, (err) => {
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
}

export default {
  topic,
  topics,
  voteCount,
  removeTopic
};
