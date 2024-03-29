const workerManager = require('../worker-threads/workerManager');
const Stock = require('../models/Stock');

const getStocks = async (req, res) => {
	if (!req.query.timespan) {
		return res.status(400).send();
	}

	const [startDate, endDate] = req.query.timespan.split(':').map(Number);

	if (!startDate || !endDate || startDate > endDate) {
		return res.status(400).send();
	}

	try {
		const response = await workerManager(startDate, endDate);

		const prices = response.map(stock => {
			stock.price /= 100;
			return stock;
		});

		req.prices = prices;
		res.send(prices);
	} catch (e) {
		const statusCode = e.statusCode ? e.statusCode : 500;
		res.status(statusCode).send({ message: e.message });
	}
};

const getTimespan = async (req, res) => {
	try {
		const startDate = await Stock.findOne({}).sort({ timestamp: 1 }).lean();
		const endDate = await Stock.findOne({}).sort({ timestamp: -1 }).lean();
		const timespan = {
			startDate: startDate.timestamp,
			endDate: endDate.timestamp,
		};

		req.timespan = timespan;
		res.send(timespan);
	} catch (e) {
		res.status(500).send({ message: e.message });
	}
};

module.exports = { getStocks, getTimespan };
