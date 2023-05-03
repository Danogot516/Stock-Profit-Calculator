require('../db/mongoose');
const Stock = require('../models/Stock');
const generateStocks = require('../utils/generateStocks');

const seedDatabase = async () => {
	await Stock.deleteMany({});
	console.log('Deleted old documents');
	const stocks = generateStocks(
		200,
		new Date('2023-05-03T22:20:00'),
		new Date('2023-06-03T22:20:00')
	);

	try {
		const chunkSize = 20000;
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
	}

	process.exit();
};

seedDatabase();
