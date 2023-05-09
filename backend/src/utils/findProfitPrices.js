const HttpError = require('../errors/HttpError');

const findProfitPrices = (array, addMinMaxPrices = false) => {
	if (array.length < 2) {
		return new HttpError('Array is not long enough', 406);
	}

	let maxProfit = -1;
	let minPrice = array[0];
	let maxPrice = array[array.length - 1];
	let stocks;

	for (let i = 1; i < array.length; ++i) {
		if (array[i].price < minPrice.price) {
			minPrice = array[i];
		} else if (array[i].price > maxPrice.price) {
			maxPrice = array[i];
		}

		if (array[i].price - minPrice.price > maxProfit) {
			maxProfit = array[i].price - minPrice.price;
			stocks = [{ ...minPrice }, { ...array[i] }];
		}
	}

	if (addMinMaxPrices) {
		if (!stocks.find(stock => stock.timestamp === minPrice.timestamp)) {
			stocks.push({ ...minPrice });
		}
		if (!stocks.find(stock => stock.timestamp === maxPrice.timestamp)) {
			stocks.push({ ...maxPrice });
		}

		stocks.sort((a, b) => a.timestamp - b.timestamp);
	}

	if ((!stocks || stocks[0].price === stocks[1].price) && !addMinMaxPrices) {
		return new HttpError('No profit found in given stocks', 406);
	}

	return stocks;
};

module.exports = findProfitPrices;
