import 'isomorphic-fetch';
import assign from 'lodash/assign';
import {SERVER_URL} from '../config';
import perfect from '../utils/perfect';
// 定义 fetch 默认选项， 看 https://github.com/github/fetch
const defaultOptions = {
  method: 'post',
  credentials: 'include', //设置该属性可以把 cookie 信息传到后台
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'x-requested-with': 'XMLHttpRequest'
  }
};

// 检查请求是否成功
function checkStatus(response) {
  const status = response.status;
  if (status >= 200 && status < 300) {
    return response;
  }
  let error = new Error(response.statusText);
  error.response = response;
  error.errorCode = status;
  throw error;
}

/**
 * 封装 fetch
 * 根据业务需求，还可以在出错的地方处理相应的功能
 * @param url
 * @param body //往后台传递的 json 参数
 * @param options // 可选参数项
 * @returns {Promise.<TResult>}
 */
function callApi({url, body = {}, options}) {
  if (!url) {
    let error = new Error('请传入 url');
    error.errorCode = 0;
    return Promise.reject(error);
  }

  let fullUrl;
  //如果是绝对路径，则直接发请求
  if (url.indexOf('http') === 0) {
    fullUrl = url;
  } else {
    fullUrl = url.indexOf(SERVER_URL) === 0 ? url : SERVER_URL + url;
  }

  let _options = assign({}, defaultOptions, options);
  let _body = assign({}, body);

  //数据为 null 不要传到后台
  Object.keys(_body).forEach((item) => {
    if (_body[item] === null) {
      delete _body[item];
    }
  });
  _options.body = perfect.stringifyJSON(_body);

  return fetch(fullUrl, _options)
    .then(checkStatus)
    .then(response =>
      response.json().then(json => ({json, response}))
    ).then(({json, response}) => {
      if (!response.ok || !json.success) {
        // 根据后台实际返回数据来定义错误格式
        let error = new Error(json.errorMsg || '获取数据出错');
        error.json = json;
        error.errorCode = json.code;
        return Promise.reject(error, json);
      }

      return {json};
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export default callApi;
