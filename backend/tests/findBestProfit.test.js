const HttpError = require('../src/errors/HttpError');
const findProfitPrices = require('../src/utils/findProfitPrices');

test('Should find best profit prices in whole array', () => {
	const prices = [5, 20, 1, 40, 5, 7].map(price => ({ price }));
	const response = findProfitPrices(prices);

	expect(response).not.toBeNull();
	expect(response).toEqual(expect.any(Array));
	expect(response[0]).toMatchObject({ price: 1 });
	expect(response[1]).toMatchObject({ price: 40 });
});

test('Should throw error that array is not long enough', () => {
	price = [5].map(price => ({ price }));

	expect(() => findProfitPrices(price)).toThrow(HttpError);
	expect(() => findProfitPrices(price)).toThrow('Array is not long enough');
});

test('Should throw error that no profit was found in array', () => {
	const prices = [20, 15, 10, 5].map(price => ({ price }));

	expect(() => findProfitPrices(prices)).toThrow(HttpError);
	expect(() => findProfitPrices(prices)).toThrow(
		'No profit found in given stocks'
	);
});

test('Should return best buy and sell prices and min and max prices contained in the array', () => {
	const prices = [100, 7, 8, 5, 50, 20, 4, 15, 1].map((price, i) => ({
		price,
		timestamp: i,
	}));
	const response = findProfitPrices(prices, true);

	expect(response).not.toBeNull();
	expect(response.length).toEqual(4);
	expect(response).toMatchObject([
		{
			price: 100,
			timestamp: 0,
		},
		{
			price: 5,
			timestamp: 3,
		},
		{
			price: 50,
			timestamp: 4,
		},
		{
			price: 1,
			timestamp: 8,
		},
	]);
});

test('Should find best profit prices in array split into chunks', () => {
	const prices = [5, 20, 1, 40, 5, 7].map((price, i) => ({
		price,
		timestamp: i,
	}));
	const chunkSize = 3;
	const chunks = [];

	for (let i = 0; i < prices.length; i += chunkSize) {
		chunks.push(prices.slice(i, i + chunkSize));
	}

	const chunkResponse = chunks.map(chunk => findProfitPrices(chunk, true));

	const response = findProfitPrices(
		chunkResponse.flatMap(chunkResponse => chunkResponse)
	);

	expect(response).not.toBeNull();
	expect(response).toEqual(expect.any(Array));
	expect(response[0]).toMatchObject({ price: 1 });
	expect(response).toMatchObject([
		{
			price: 1,
			timestamp: 2,
		},
		{
			price: 40,
			timestamp: 3,
		},
	]);
});
