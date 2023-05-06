/**
 * Generates realistic looking stock prices to seed the database
 *
 * @param   {int}  price      The starting price of the stock
 * @param   {Date}  startDate  The starting date of the stock prices
 * @param   {Date}  endDate    The ending date of the stock prices
 *
 * @return  {[int]}             An array of integers - the floating point numbers have been multiplied by 100 to remove floating point precision errors
 */
const generateStocks = (price, startDate, endDate) => {
	let prices = [];
	price = Math.round(price * 100);

	for (let i = startDate.getTime(); i < endDate.getTime(); i += 1000) {
		let min = Math.round(price * -0.02);
		let max = Math.round(price * 0.02);
		price = price + Math.round(Math.random() * (max - min) + min);

		prices.push({ timestamp: i, price });
	}

	return prices;
};

module.exports = generateStocks;
