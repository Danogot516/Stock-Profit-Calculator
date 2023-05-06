const Stock = require('../models/Stock');
const findProfitPrices = require('../utils/findProfitPrices');

const getStocks = async (req, res) => {
	if (!req.query.timespan) {
		return res.status(400).send();
	}

	const [startDate, endDate] = req.query.timespan.split(':');

	if (!startDate || !endDate) {
		return res.status(400).send();
	}

	try {
		const stocks = await Stock.find(
			{
				timestamp: { $gte: startDate, $lte: endDate },
			},
			'-_id -__v'
		).lean();

		const response = findProfitPrices(stocks);

		if (response.error) {
			return res.status(406).send(response.error);
		}

		const prices = response.result.map(stock => {
			stock.price /= 100;
			return stock;
		});

		res.send(prices);
	} catch (e) {
		const statusCode = e.statusCode ? e.statusCode : 500;
		res.status(statusCode).send({ message: e.message });
	}
};

module.exports = { getStocks };
