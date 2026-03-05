const mongoose = require('mongoose');
const {config} = require('./env');

async function connectToMongo() {
	await mongoose.connect(config.mongoUri);
	console.log('Connected to MongoDB');
}

module.exports = {connectToMongo};
