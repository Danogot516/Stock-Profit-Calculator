const request = require('supertest');
const app = require('../src/app');
const { setupDatabase } = require('./fixtures/db');

beforeEach(async () => {
	await setupDatabase();
});

test('Should find best profit prices in whole array', async () => {
	const response = await request(app)
		.get('/stocks?timespan=1682899200000:1682899800000')
		.expect(200);

	const body = response.body;

	expect(body).not.toBeNull();
	expect(body).toEqual(expect.any(Array));
	expect(body[0]).toMatchObject({
		timestamp: 1682899200000,
		price: 0,
	});
	expect(body[1]).toMatchObject({
		timestamp: 1682899499000,
		price: 600,
	});
});

test('Should find best profit prices in second price of array', async () => {
	const response = await request(app)
		.get('/stocks?timespan=1682899440000:1682899800000')
		.expect(200);

	const body = response.body;

	expect(body).not.toBeNull();
	expect(body).toEqual(expect.any(Array));
	expect(body[0]).toMatchObject({
		timestamp: 1682899500000,
		price: 1,
	});
	expect(body[1]).toMatchObject({
		timestamp: 1682899800000,
		price: 600,
	});
});

test('Should not find profit prices in last part of array', async () => {
	const response = await request(app)
		.get('/stocks?timespan=1682899800000:1682899900000')
		.expect(406);
});

test('Should not accept request with missing/empty timespan query parameter', async () => {
	const response = await request(app).get('/stocks').expect(400);
});

test('Should not accept request with starting date later than ending date', async () => {
	const response = await request(app)
		.get('/stocks?timespan=1682899900000:1682899800000')
		.expect(400);
});

test('Should find return correct starting and ending date for all stocks', async () => {
	const response = await request(app).get('/stocks/timespan').expect(200);

	expect(response.body).toMatchObject({
		startDate: 1682899200000,
		endDate: 1682899900000,
	});
});
