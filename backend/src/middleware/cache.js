const { getAsync, putAsync } = require('../utils/cache');

const getKeyFromRequest = req => req.query.timespan;

const cacheMiddleware = async (req, res, next) => {
	const key = getKeyFromRequest(req);
	const content = await getAsync(key);

	res.on('finish', () => {
		if (req.prices && !content) {
			putAsync(key, req.prices);
		}
	});

	if (content) {
		return res.send(content);
	}

	next();
};

module.exports = cacheMiddleware;
