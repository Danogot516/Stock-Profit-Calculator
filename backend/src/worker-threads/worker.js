const StockProfitPricesMinute = require('../models/StockProfitPricesMinute');
const findProfitPrices = require('../utils/findProfitPrices');
const mongoose = require('mongoose');

module.exports = async ({ startDateChunk, endDateChunk }) => {
	mongoose.connect(process.env.MONGODB_URL, { serverSelectionTimeoutMS: 1000 });

	try {
		const stocks = await StockProfitPricesMinute.find(
			{
				timestamp: { $gte: startDateChunk, $lte: endDateChunk },
			},
			'-_id -__v -stocks._id'
		).lean();

		const result = findProfitPrices(
			stocks.flatMap(stock => stock.stocks),
			true
		);

		return result;
	} catch (error) {
		throw error;
	}
};
