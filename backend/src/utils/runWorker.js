const { Worker } = require('worker_threads');

const runWorker = (workerData, retries = 3) => {
	return new Promise(async (resolve, reject) => {
		if (retries === 0) {
			reject(new Error('Maximum retries reached'));
			return;
		}

		const worker = new Worker('./src/utils/worker.js', { workerData });

		worker.on('message', message => {
			if (message.error) {
				console.error(`Error from worker: ${message.error}. Retrying...`);

				// Retry the work by calling runWorker again with decremented retries
				runWorker(workerData, retries - 1)
					.then(resolve)
					.catch(reject);
			} else {
				resolve(message.result);
			}
		});

		worker.on('error', reject);

		worker.on('exit', code => {
			if (code !== 0) {
				reject(new Error(`Worker stopped with exit code ${code}`));
			}
		});
	});
};

module.exports = runWorker;
