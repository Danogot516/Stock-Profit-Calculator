require('../db/mongoose');
const seedDatabaseStocksMinutes = require('../db/seedDatabaseStockMinutes');
const seedDatabaseStocks = require('../db/seedDatabaseStocks');
const { price, chunkSize, startDate, endDate } = require('minimist')(
	process.argv.slice(2)
);

const PRICE = price || 200;
const CHUNK_SIZE = chunkSize || 20000;
const START_DATE = startDate || '2023-05-01';
const END_DATE = endDate || '2023-06-01';

if (!PRICE || !CHUNK_SIZE || !START_DATE || !END_DATE) {
	console.log('Missing environment variables!');
	process.exit();
}

if (isNaN(Date.parse(START_DATE)) || isNaN(Date.parse(END_DATE))) {
	console.log('Date environment variables are invalid!');
	process.exit();
}

(async () => {
	try {
		await seedDatabaseStocks(
			PRICE,
			CHUNK_SIZE,
			new Date(START_DATE),
			new Date(END_DATE)
		);

		await seedDatabaseStocksMinutes(CHUNK_SIZE);

		process.exit();
	} catch (e) {
		console.log(e.message);
		process.exit();
	}
})();
