const findProfitPrices = require('../utils/findProfitPrices');
const runWorker = require('./runWorker');
const os = require('os');

let numWorkers = Math.min(os.cpus().length, process.env.MAX_WORKERS_THREADS);

const workerManager = async (startDate, endDate) => {
	const totalDataSize = (endDate - startDate) / 1000 + 1;
	numWorkers =
		Math.ceil(totalDataSize / 60) < numWorkers
			? Math.ceil(totalDataSize / 60)
			: numWorkers;
	const chunkSize = Math.ceil(totalDataSize / numWorkers);
	const promises = [];

	for (let i = 0; i < numWorkers; i++) {
		const startIndex = i * chunkSize ? i * chunkSize + 1 : 0;
		const endIndex = Math.min((i + 1) * chunkSize, totalDataSize - 1);
		const chunkStartDate = startDate + startIndex * 1000;
		const chunkEndDate = startDate + endIndex * 1000;
		promises.push(runWorker({ chunkStartDate, chunkEndDate }));
	}

	const results = await Promise.all(promises);
	const combinedStocks = results.flatMap(data => data);

	return findProfitPrices(combinedStocks);
};

module.exports = workerManager;
