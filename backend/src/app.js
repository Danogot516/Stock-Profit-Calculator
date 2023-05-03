const express = require('express');
require('./db/mongoose');
const stockRouter = require('./routers/stock');

const app = express();

app.use(express.json());
app.use(stockRouter);

module.exports = app;
