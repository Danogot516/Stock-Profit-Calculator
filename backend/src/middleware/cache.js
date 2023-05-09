const { getAsync, putAsync } = require('../utils/cache');

const getKeyFromRequest = (req, cachingKey) => req.query[cachingKey];

const cacheMiddleware = (cachingKey, cachingParameter) => {
	return async (req, res, next) => {
		const key = getKeyFromRequest(req, cachingKey);
		const content = await getAsync(key);

		res.on('finish', () => {
			if (req.prices && !content) {
				putAsync(key, req[cachingParameter]);
			}
		});

		if (content) {
			return res.send(content);
		}

		next();
	};
};

module.exports = cacheMiddleware;
