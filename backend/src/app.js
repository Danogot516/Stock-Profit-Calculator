const express = require('express');
const stockRouter = require('./routers/stock');
const cors = require('cors');
require('./db/mongoose');

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: '*',
	})
);
app.use(stockRouter);

module.exports = app;
