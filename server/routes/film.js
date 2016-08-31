import express from 'express';
import filmController from '../controllers/film';

const router = express.Router();

router.get('/all', filmController.all);
router.get('/popularity',filmController.popularity);

export default router;
