const customDateRenderer = date => {
	return `${date.getDate()}-${(date.getMonth() + 1)
		.toString()
		.padStart(2, '0')}-${date.getFullYear()} ${date
		.getHours()
		.toString()
		.padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

export default customDateRenderer;
