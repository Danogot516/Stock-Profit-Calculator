const { getAsync, putAsync } = require('../utils/cache');

const getKeyFromRequest = (req, cachingKey) => req.query[cachingKey];

const cacheMiddleware = (cachingKey, cachingParameter) => {
	return async (req, res, next) => {
		if (process.env.NODE_ENV === 'test') {
			return next();
		}

		const key = getKeyFromRequest(req, cachingKey) || cachingParameter;
		const content = await getAsync(key);

		res.on('finish', () => {
			if (req[cachingParameter] && !content) {
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
