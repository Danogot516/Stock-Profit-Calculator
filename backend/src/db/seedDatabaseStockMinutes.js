const Stock = require('../models/Stock');
const StockProfitPricesMinute = require('../models/StockProfitPricesMinute');
const findProfitPrices = require('../utils/findProfitPrices');

const seedDatabaseStocksMinutes = async (chunkSize = 20000) => {
	try {
		const stocks = await Stock.find({}, '-_id -__v')
			.sort({ timestamp: 1 })
			.lean();
		const startDate = stocks[0].timestamp;

		console.log('Fetched stocks from database');

		await StockProfitPricesMinute.deleteMany({});

		console.log('Deleted old documents');

		const stockPricesMinutes = [];

		for (let i = 0; i < stocks.length; i += 60) {
			const prices = findProfitPrices(stocks.slice(i, i + 60), true);

			stockPricesMinutes.push({
				timestamp: startDate + i * 1000,
				stocks: [...prices],
			});
		}

		console.log('Generated best stock prices for each minute');

		for (let i = 0; i < stockPricesMinutes.length; i += chunkSize) {
			const chunk = stockPricesMinutes.slice(i, i + chunkSize);
			await StockProfitPricesMinute.insertMany(chunk);

			console.log(
				`Inserted ${chunkSize} best stock prices for each minute starting from ${new Date(
					chunk[0].timestamp
				).toISOString()} and ending at ${new Date(
					chunk[chunk.length - 1].timestamp
				).toISOString()}`
			);
		}
	} catch (error) {
		throw error;
	}
};

module.exports = seedDatabaseStocksMinutes;
