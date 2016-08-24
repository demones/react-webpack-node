var express = require('express');
var router = express.Router();
var film = require('../controllers/film');

router.post('/all', film.all);
router.post('/popularity',film.popularity);

module.exports = router;
