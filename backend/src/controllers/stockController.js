const Stock = require('../models/Stock');
const findProfitPrices = require('../utils/findProfitPrices');
const os = require('os');
const runWorker = require('../utils/runWorker');

const numWorkers = os.cpus().length;

const getStocks = async (req, res) => {
	if (!req.query.timespan) {
		return res.status(400).send();
	}

	const [startDate, endDate] = req.query.timespan.split(':');

	if (!startDate || !endDate || startDate > endDate) {
		return res.status(400).send();
	}

	try {
		const totalDataSize = (endDate - startDate) / 1000;
		const chunkSize = Math.ceil(totalDataSize / numWorkers);
		const promises = [];

		for (let i = 0; i < numWorkers; i++) {
			const startIndex = i * chunkSize;
			const endIndex = Math.min((i + 1) * chunkSize, totalDataSize - 1);
			promises.push(runWorker({ startDate, endDate, startIndex, endIndex }));
		}

		const results = await Promise.all(promises);
		const flattenedResults = results.flatMap(result => result.data);
		const stocksProfit = findProfitPrices(flattenedResults);
		const response = stocksProfit.result.map(stock => {
			stock.price /= 100;
			return stock;
		});

		res.send(response);
	} catch (e) {
		const statusCode = e.statusCode ? e.statusCode : 500;
		res.status(statusCode).send({ message: e.message });
	}
};

module.exports = { getStocks };
