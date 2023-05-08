const mongoose = require('mongoose');

// Stocks have a unix timestamp and a price - both will be whole numbers
// Price will be converted to decimal number when sending response to client to prevent floating point errors
const stockProfitPricesMinuteSchema = new mongoose.Schema({
	timestamp: {
		type: Number,
		index: true,
		required: true,
	},
	stocks: [
		{
			timestamp: {
				type: Number,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
		},
	],
});

const StockProfitPricesMinute = mongoose.model(
	'StockProfitPricesMinute',
	stockProfitPricesMinuteSchema
);

module.exports = StockProfitPricesMinute;
