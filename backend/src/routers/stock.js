const express = require('express');
const router = new express.Router();
const stockController = require('../controllers/stockController');
const cacheMiddleware = require('../middleware/cache');

// GET /stocks?timespan=unixTimestamp:unixTimestamp
router.get(
	'/stocks',
	cacheMiddleware('timespan', 'prices'),
	stockController.getStocks
);

module.exports = router;
