import film from './film';
import person from './person';
import vote from './vote';

export default (app) => {
  app.use('/api/film', film);
  app.use('/api/person', person);
  app.use('/api/vote', vote);
};
