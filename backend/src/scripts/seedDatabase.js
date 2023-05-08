require('../db/mongoose');
const seedDatabaseStocksMinutes = require('../db/seedDatabaseStockMinutes');
const seedDatabaseStocks = require('../db/seedDatabaseStocks');
const {
	PRICE,
	CHUNK_SIZE,
	START_DATE: startDate,
	END_DATE: endDate,
} = process.env;

const price = +PRICE;
const chunkSize = +CHUNK_SIZE;

if (!price || !chunkSize || !startDate || !endDate) {
	console.log('Missing environment variables!');
	process.exit();
}

if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
	console.log('Date environment variables are invalid!');
	process.exit();
}

(async () => {
	try {
		await seedDatabaseStocks(
			price,
			chunkSize,
			new Date(startDate),
			new Date(endDate)
		);

		await seedDatabaseStocksMinutes(chunkSize);

		process.exit();
	} catch (e) {
		console.log(e.message);
		process.exit();
	}
})();
