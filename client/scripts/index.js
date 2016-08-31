import React from 'react'
import {render} from 'react-dom'
import Root from './containers/Root';
import promise from 'es6-promise';
import './bootstrapCss';

// Promise 兼容性处理
promise.polyfill();

render(
  <Root/>,
  document.getElementById('layout')
);
