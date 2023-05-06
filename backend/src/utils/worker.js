const {
	workerData: { startDate, endDate, startIndex, endIndex },
	parentPort,
} = require('worker_threads');
const findProfitPrices = require('./findProfitPrices');
const Stock = require('../models/Stock');
require('../db/mongoose');

(async () => {
	try {
		const stocks = await Stock.find(
			{
				timestamp: { $gte: startDate, $lte: endDate },
			},
			'-_id -__v'
		)
			.skip(startIndex)
			.limit(endIndex - startIndex)
			.lean();

		const result = findProfitPrices(stocks);

		parentPort.postMessage({ result });
	} catch (e) {
		parentPort.postMessage({ error: e.message });
	}
})();
