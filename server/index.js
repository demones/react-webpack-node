import path from 'path';
import express from 'express';
import webpack from 'webpack'
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import gzip from 'compression';
import helmet from 'helmet';
import serialize from 'serialize-javascript'
import React, {PropTypes} from 'react'
import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux'
import {createMemoryHistory, match, RouterContext} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import mongodb from './mongodb';
import config from './config';
import routes from './routes';
import sessionStore from './session-store';

import configureStore from '../client/scripts/store'
import createRoutes from '../client/scripts/routes'
import createSelectLocationState from '../client/scripts/routes/createSelectLocationState';
import {IP, PORT} from '../client/scripts/config';

const app = express();

// 连接数据库
mongodb();

// 开发环境开启热部署
if (config.env === 'development') {
  const webpackDevConfig = require('../webpack/webpack.config.dev');
  const compiler = webpack(webpackDevConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    stats: {
      colors: true
    },
    publicPath: webpackDevConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}


// express setting
if (config.env === 'production') {
  app.use(gzip());
  // Secure your Express apps by setting various HTTP headers. Documentation: https://github.com/helmetjs/helmet
  app.use(helmet());
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '20mb'}));//设置前端post提交最大内容
app.use(bodyParser.urlencoded({limit: '20mb', extended: false}));
app.use(cookieParser(config.cookieSecret));
app.use(express.static(path.resolve(__dirname, '../dist')));

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
const HTML = ({content, store}) => {
  let html = `window.__initialState__=${serialize(store.getState())};`;
  return (
    <html>
    <body>
    <div id="layout" dangerouslySetInnerHTML={{ __html: content }}/>
    <div id="devtools"/>
    <script dangerouslySetInnerHTML={{ __html: html }}/>
    <script src="/__build__/bundle.js"/>
    </body>
    </html>
  )
};

HTML.propTypes = {
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
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const content = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps}/>
        </Provider>
      );
      /*eslint-disable prefer-template,react/jsx-pascal-case*/
      res.send('<!doctype html>\n' + renderToString(<HTML content={content} store={store}/>))
    }
  })
});

app.listen(PORT, IP, () => {
  console.log(`Server listening on http://${IP}:${PORT}, Ctrl+C to stop`)
});
