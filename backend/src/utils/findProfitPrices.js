const HttpError = require('../errors/HttpError');

const findProfitPrices = array => {
	if (array.length < 2) {
		return new HttpError('Array is not long enough', 406);
	}

	let maxProfit = -1;
	let minPrice = { ...array[0] };
	let prices;

	for (let i = 1; i < array.length; ++i) {
		if (array[i].price < minPrice.price) {
			minPrice = { ...array[i] };
		} else if (array[i].price - minPrice.price > maxProfit) {
			maxProfit = array[i].price - minPrice.price;
			prices = [{ ...minPrice }, { ...array[i] }];
		}
	}

	if (!prices || prices[0].price === prices[1].price) {
		return new Error('No profit found in given stocks', 406);
	}

	return { result: prices };
};

module.exports = findProfitPrices;
