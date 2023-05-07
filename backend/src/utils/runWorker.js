const Piscina = require('piscina');

const piscina = new Piscina({
	filename: './src/utils/worker.js',
});

const runWorker = async (workerData, retries = 3) => {
	if (retries === 0) {
		throw new Error('Maximum retries reached');
	}

	try {
		const result = await piscina.run(workerData);

		return result;
	} catch (error) {
		console.error(`Error from worker: ${error.message}. Retrying...`);

		return runWorker(workerData, retries - 1);
	}
};

module.exports = runWorker;
