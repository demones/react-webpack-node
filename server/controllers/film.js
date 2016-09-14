export function all(req, res) {
  const data = {
    'success': true,
    'data': [
      {
        'id': 1,
        'name': '北京遇上西雅图',
        'link': 'http://www.iqiyi.com/dianying/20130509/5ef7f790b2a936f9.html#vfrm=2-4-0-1'
      },
      {
        'id': 2,
        'name': '叶问',
        'link': 'http://www.iqiyi.com/dianying/20100401/n918.html#vfrm=2-4-0-1'
      },
      {
        'id': 3,
        'name': '少林足球',
        'link': 'http://www.iqiyi.com/v_19rrho3hqc.html#vfrm=2-4-0-1'
      },
      {
        'id': 4,
        'name': '新娘大作战',
        'link': 'http://www.iqiyi.com/v_19rrkltfq0.html#vfrm=2-4-0-1'
      },
      {
        'id': 5,
        'name': '光的棍',
        'link': 'http://www.iqiyi.com/v_19rrhdhktc.html?fc=87451bff3f7d2f4a#vfrm=2-3-0-1'
      }
    ],
    'message': '成功'
  };

  return res.json(data);
}

export function popularity(req, res) {
  const data = {
    'success': true,
    'data': [
      {
        'id': 100,
        'name': '我的少女时代',
        'link': 'http://www.iqiyi.com/v_19rrkib984.html#vfrm=2-4-0-1'
      },
      {
        'id': 102,
        'name': '怦然星动',
        'link': 'http://www.iqiyi.com/v_19rrkfltns.html#vfrm=2-4-0-1'
      },
      {
        'id': 103,
        'name': '致我们终将到来的爱情',
        'link': 'http://www.iqiyi.com/v_19rrlpbu28.html#vfrm=2-4-0-1'
      }
    ],
    'message': '成功'
  };

  return res.json(data);
}

export default {
  all,
  popularity
};