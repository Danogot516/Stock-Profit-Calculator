const express = require('express');
const router = new express.Router();
const stockController = require('../controllers/stockController');

// GET /stocks?timespan=unixTimestamp:unixTimestamp
router.get('/stocks', stockController.getStocks);

module.exports = router;
