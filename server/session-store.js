import session from 'express-session';
import connectMongo from 'connect-mongo';
import config from './config';

const MongoStore = connectMongo(session);

// 设置 session store
export default () =>
  new MongoStore(
    {
      url: config.mongodb,
      autoReconnect: true
    }
  );
