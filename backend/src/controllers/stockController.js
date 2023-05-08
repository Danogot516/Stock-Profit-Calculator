const findProfitPrices = require('../utils/findProfitPrices');
const os = require('os');
const runWorker = require('../worker-threads/runWorker');

const numWorkers = Math.min(os.cpus().length, 4);

const getStocks = async (req, res) => {
	if (!req.query.timespan) {
		return res.status(400).send();
	}

	const [startDate, endDate] = req.query.timespan.split(':').map(Number);

	if (!startDate || !endDate || startDate > endDate) {
		return res.status(400).send();
	}

	try {
		const totalDataSize = (endDate - startDate) / 1000 + 1;
		const chunkSize = Math.ceil(totalDataSize / numWorkers);
		const promises = [];

		for (let i = 0; i < numWorkers; i++) {
			const startIndex = i * chunkSize ? i * chunkSize + 1 : 0;
			const endIndex = Math.min((i + 1) * chunkSize, totalDataSize - 1);
			const startDateChunk = startDate + startIndex * 1000;
			const endDateChunk = startDate + endIndex * 1000;
			promises.push(runWorker({ startDateChunk, endDateChunk }));
		}

		const results = await Promise.all(promises);
		const combinedStocks = results.flatMap(data => data);
		const response = findProfitPrices(combinedStocks);
		const prices = response.map(stock => {
			stock.price /= 100;
			return stock;
		});

		res.send(prices);
	} catch (e) {
		const statusCode = e.statusCode ? e.statusCode : 500;
		res.status(statusCode).send({ message: e.message });
	}
};

module.exports = { getStocks };
