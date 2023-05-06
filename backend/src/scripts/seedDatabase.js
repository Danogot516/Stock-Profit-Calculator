require('../db/mongoose');
const seedDatabase = require('../utils/seedDatabase');
const argv = require('minimist')(process.argv.slice(2));

if (!argv.price || !argv.chunkSize || !argv.startDate || !argv.endDate) {
	console.log('Missing arguments!');
	process.exit();
}

if (isNaN(Date.parse(argv.startDate)) || isNaN(Date.parse(argv.endDate))) {
	console.log('Date arguments are invalid!');
	process.exit();
}

seedDatabase(
	argv.price,
	argv.chunkSize,
	new Date(argv.startDate),
	new Date(argv.endDate)
);
