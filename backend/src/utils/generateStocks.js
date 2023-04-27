export default generateStock = (price, startDate, endDate) => {
	let prices = [];

	for (let i = startDate.getTime(); i < endDate.getTime(); i += 1000) {
		let min = price * -0.02;
		let max = price * 0.02;
		price = price + Math.random() * (max - min) + min;
		prices.push({ timestamp: i, price });
	}

	return prices;
};
