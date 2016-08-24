import express from 'express';
import webpack from 'webpack'
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import gzip from 'compression';
import helmet from 'helmet';
import serialize from 'serialize-javascript'
import React, {PropTypes} from 'react'
import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux'
import {createMemoryHistory, match, RouterContext} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import configureStore from '../client/store'
import createRoutes from '../client/routes'
import createSelectLocationState from '../client/routes/createSelectLocationState';

import config from './config';
import routes from './routes';

const app = express();

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
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: false}));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../dist')));

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
  const memoryHistory = createMemoryHistory(req.url)
  const store = configureStore(memoryHistory)
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

app.listen(8080, () => {
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop')
});
