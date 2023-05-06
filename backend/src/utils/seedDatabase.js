const Stock = require('../models/Stock');
const generateStocks = require('./generateStocks');

const seedDatabase = async (
	initialPrice,
	chunkSize = 20000,
	startDate,
	endDate
) => {
	await Stock.deleteMany({});
	console.log('Deleted old documents');
	const stocks = generateStocks(initialPrice, startDate, endDate);

	try {
		for (let i = 0; i < stocks.length; i += chunkSize) {
			const chunk = stocks.slice(i, i + chunkSize);
			await Stock.insertMany(chunk);

			console.log(
				`Inserted ${chunkSize} stock prices starting from ${
					chunk[0].timestamp
				} and ending at ${chunk[chunk.length - 1].timestamp}`
			);
		}
	} catch (error) {
		console.log(error);
		process.exit();
	}

	process.exit();
};

module.exports = seedDatabase;
