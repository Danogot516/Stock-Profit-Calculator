const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, { serverSelectionTimeoutMS: 1000 });
