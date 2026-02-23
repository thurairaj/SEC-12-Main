const mongoose = require('mongoose');

async function connectDB() {
	const uri = process.env.MONGODB_URI;
	if (!uri) throw new Error ("MongoDB URI is missing");

	try {
		await mongoose.connect(uri)
		console.log("MongoDB Connected");
	} catch (error) {
		console.log("MongoDb connection error", error.message);
		process.exit(1);
	}
}

module.exports = connectDB;
