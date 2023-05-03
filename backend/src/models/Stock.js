const mongoose = require('mongoose');

// Stocks have a unix timestamp and a price - both will be whole numbers
// Price will be converted to decimal number when sending response to client to prevent floating point errors
const stockSchema = new mongoose.Schema({
	timestamp: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
