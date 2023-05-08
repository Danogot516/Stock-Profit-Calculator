const PersistentCache = require('persistent-cache');
const util = require('util');
const path = require('path');

const cachePath = path.join(__dirname, '../../');

const prices = PersistentCache({
	duration: 1000 * 3600 * 24 * 30,
	base: cachePath,
});
const putAsync = util.promisify(prices.put.bind(prices));
const getAsync = util.promisify(prices.get.bind(prices));
const unlinkAsync = util.promisify(prices.unlink.bind(prices));

module.exports = { putAsync, getAsync, unlinkAsync };
