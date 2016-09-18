import path from 'path';
import express from 'express';
import webpack from 'webpack'
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import gzip from 'compression';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript'
import React, {PropTypes} from 'react'
import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux'
import {createMemoryHistory, match, RouterContext} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import mongodb from './server/mongodb';
import config from './server/config';
import routes from './server/routes';
import sessionStore from './server/session-store';

import configureStore from './client/scripts/store'
import createRoutes from './client/scripts/routes'
import createSelectLocationState from './client/scripts/routes/createSelectLocationState';
import {IP, PORT} from './client/scripts/config';

const app = express();

// 连接数据库
mongodb();

// 开发环境开启热部署
if (config.env === 'development') {
  const webpackDevConfig = require('./webpack.config.dev.babel');
  const compiler = webpack(webpackDevConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, //如果设置该参数为 true，则不打印输出信息
    cache: true, //开启缓存，增量编译
    debug: true, //开启 debug 模式
    stats: {
      colors: true, //打印日志显示颜色
      reasons: true //打印相关被引入的模块
    },
    publicPath: webpackDevConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

// express setting
if (config.env === 'production') {
  app.use(gzip());
}

app.use(logger('dev'));
app.use(bodyParser.json({limit: '20mb'}));//设置前端post提交最大内容
app.use(bodyParser.urlencoded({limit: '20mb', extended: false}));
app.use(cookieParser(config.cookieSecret));
app.use(express.static(config.env === 'development' ? path.resolve(__dirname, './dev') : path.resolve(__dirname, './client')));

// 设置 session
const store = sessionStore();
// Populates req.session
const sessionOptions = {
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: config.sessionSecret, // session secret
  proxy: true, // The "X-Forwarded-Proto" header will be used.
  name: 'sessionId',
  // Add HTTPOnly, Secure attributes on Session Cookie
  // If secure is set, and you access your site over HTTP, the cookie will not be set
  cookie: {
    httpOnly: true,
    secure: false,
  },
  store
};

app.use(session(sessionOptions));

// load routers
//定义路由
routes(app);

//Render Initial HTML
/*eslint-disable react/no-danger*/
const Html = ({content, store}) => {
  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const scriptHtml = `window.__initialState__=${serialize(store ? store.getState() : {})};`;
  const head = Helmet.rewind();
  const headHtml = `
      ${head.base.toString()}
      ${head.title.toString()}
      ${head.meta.toString()}
      ${head.link.toString()}
      ${head.script.toString()}

      ${config.env === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/index.bootstrap.css']}' />` : ''}
      ${config.env === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/index.css']}' />` : ''}
      <link rel="icon" type="image/x-icon" href="/favicon.ico">
      <link rel="apple-touch-icon" href="/favicon.ico">
   `;

  //设置 manifest 为不存在的文件，防止部分浏览器缓存
  return (
    <html manifest="IGNORE.manifest">
    <head dangerouslySetInnerHTML={{ __html: headHtml }}/>
    <body>
    <div id="layout" dangerouslySetInnerHTML={{ __html: content }}/>
    <div id="devtools"/>
    <script dangerouslySetInnerHTML={{ __html: scriptHtml }}/>
    {config.env === 'production' ? (<script src={assetsManifest['/vendor.js']}/>) : (
      <script src="/vendor.dll.js"/>
    )}
    <script src={config.env === 'production' ? assetsManifest['/index.js'] : '/dev/index.js'}/>
    </body>
    </html>
  )
};

Html.propTypes = {
  content: PropTypes.string,
  store: PropTypes.object
};

app.use((req, res) => {
  const memoryHistory = createMemoryHistory(req.url);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store, {
    selectLocationState: createSelectLocationState()
  });

  const routes = createRoutes(store);

  match({history, routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      const softTab = '&#32;&#32;&#32;&#32;';
      const errTrace = process.env.NODE_ENV !== 'production'
        ? `<br><br><pre style="color:red">${softTab}${error.stack.replace(/\n/g, `<br>${softTab}`)}</pre>`
        : '';
      res.status(500).send(renderToString(<Html content={`Server Error${errTrace}`}/>));

    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const content = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps}/>
        </Provider>
      );
      /*eslint-disable prefer-template,react/jsx-pascal-case*/
      res.send('<!doctype html>\n' + renderToString(<Html content={content} store={store}/>))
    }
  })
});

app.listen(PORT, IP, () => {
  console.log(`Server listening on http://${IP}:${PORT}, Ctrl+C to stop`)
});
