import {Router} from 'express';
import film from './film';

export default function (app) {
  app.use('/api/film', film);
};
