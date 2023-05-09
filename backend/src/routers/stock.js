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

// GET /stocks?timespan=unixTimestamp:unixTimestamp
router.get(
	'/stocks/timespan',
	cacheMiddleware(null, 'timespan'),
	stockController.getTimespan
);

module.exports = router;
