const StockProfitPricesMinute = require('../models/StockProfitPricesMinute');
const findProfitPrices = require('../utils/findProfitPrices');
const mongoose = require('mongoose');

module.exports = async ({ chunkStartDate, chunkEndDate }) => {
	mongoose.connect(process.env.MONGODB_URL, { serverSelectionTimeoutMS: 1000 });

	const stocks = await StockProfitPricesMinute.find(
		{
			timestamp: { $gte: chunkStartDate, $lte: chunkEndDate },
		},
		'-_id -__v -stocks._id'
	).lean();

	const result = findProfitPrices(
		stocks.flatMap(stock => stock.stocks),
		true
	);

	return result;
};
