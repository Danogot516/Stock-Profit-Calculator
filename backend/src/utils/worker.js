const {
	workerData: { startDate, endDate, startIndex, endIndex },
	parentPort,
} = require('worker_threads');
const findProfitPrices = require('./findProfitPrices');
const Stock = require('../models/Stock');
const addonProfitPrices = require('../../build/Release/addon_profit_prices');
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

		const typedPrices = new Int32Array(stocks.map(stock => stock.price));

		const { minPriceIndex, maxPriceIndex } =
			addonProfitPrices.findProfitPrices(typedPrices);

		const stocksProfit = [stocks[minPriceIndex], stocks[maxPriceIndex]];

		parentPort.postMessage({ data: stocksProfit });
	} catch (e) {
		parentPort.postMessage({ error: e.message });
	}
})();
