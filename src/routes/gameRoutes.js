const express = require('express');
const { startGame, hit, stand } = require('../controllers/gameController');
const router = express.Router();

router.post('/start', startGame);
router.post('/hit', hit);
router.post('/stand', stand);

module.exports = router;
