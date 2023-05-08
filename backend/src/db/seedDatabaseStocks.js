const Stock = require('../models/Stock');
const generateStocks = require('../utils/generateStocks');

const seedDatabaseStocks = async (
	initialPrice,
	chunkSize = 20000,
	startDate,
	endDate
) => {
	await Stock.deleteMany({});
	console.log('Deleted old documents');
	const stocks = generateStocks(initialPrice, startDate, endDate);
	console.log('Generated stock prices');

	for (let i = 0; i < stocks.length; i += chunkSize) {
		const chunk = stocks.slice(i, i + chunkSize);
		await Stock.insertMany(chunk);

		console.log(
			`Inserted ${chunkSize} stock prices starting from ${new Date(
				chunk[0].timestamp
			).toISOString()} and ending at ${new Date(
				chunk[chunk.length - 1].timestamp
			).toISOString()}`
		);
	}
};

module.exports = seedDatabaseStocks;
