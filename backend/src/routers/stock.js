const express = require('express');
const router = new express.Router();
const Stock = require('../models/Stock');
const findProfitPrices = require('../utils/findProfitPrices');

// GET /stocks?timespan=unixTimestamp:unixTimestamp
router.get('/stocks', async (req, res) => {
	if (!req.query.timespan) {
		return res.status(400).send();
	}

	const [startDate, endDate] = req.query.timespan.split(':');

	if (!startDate || !endDate) {
		return res.status(400).send();
	}

	try {
		const stocks = await Stock.find(
			{
				timestamp: { $gte: startDate, $lte: endDate },
			},
			'-_id -__v'
		).lean();

		const prices = findProfitPrices(stocks);

		res.send({ buyPrice: prices[0], sellPrice: prices[1] });
	} catch (e) {
		res.status(500).send({ message: e.message });
	}
});

module.exports = router;
