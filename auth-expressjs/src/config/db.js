const mongoose = require('mongoose');
const {config} = require('./env');

async function connectToMongo() {
	await mongoose.connect(config.mongoUri)
}

module.exports = {connectToMongo};
