require('../db/mongoose');
const seedDatabaseStocksMinutes = require('../db/seedDatabaseStockMinutes');
const { CHUNK_SIZE } = process.env;

const chunkSize = +CHUNK_SIZE;

if (!chunkSize) {
	console.log('Missing CHUNK_SIZE environment variable!');
	process.exit();
}

(async () => {
	try {
		await seedDatabaseStocksMinutes(chunkSize);

		process.exit();
	} catch (error) {
		console.log(error.message);
		process.exit();
	}
})();
