const seedDatabaseStocksMinutes = require('../../src/db/seedDatabaseStockMinutes');
const Stock = require('../../src/models/Stock');

const setupDatabase = async () => {
	const stocks = [];

	for (let i = 0; i <= 700; i++) {
		stocks.push({
			timestamp: new Date('2023-05-01').getTime() + i * 1000,
			price: i > 600 ? stocks[stocks.length - 1].price - 100 : i * 100,
		});
	}

	stocks[299] = { ...stocks[299], price: 60000 };
	stocks[300] = { ...stocks[300], price: 100 };

	await Stock.deleteMany({});
	await Stock.insertMany(stocks);

	await seedDatabaseStocksMinutes();
};

module.exports = {
	setupDatabase,
};
