import express from 'express';
import {topic, topics, voteCount, removeTopic} from '../controllers/vote';

const router = express.Router();

router.post('/topic', topic);
router.get('/topics', topics);
router.put('/count', voteCount);
router.delete('/topic/:id', removeTopic);

export default router;