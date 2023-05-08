const { unlinkAsync } = require('../utils/cache');

(async () => {
	try {
		await unlinkAsync();
		process.exit();
	} catch (error) {
		console.log(error);
		process.exit();
	}
})();
