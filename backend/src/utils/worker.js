const findProfitPrices = require('./findProfitPrices');
const Stock = require('../models/Stock');
const mongoose = require('mongoose');

module.exports = async ({ startDate, endDate, startIndex, endIndex }) => {
	mongoose.connect(process.env.MONGODB_URL, { serverSelectionTimeoutMS: 1000 });

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

		return result;
	} catch (e) {
		return { error: e.message };
	}
};
