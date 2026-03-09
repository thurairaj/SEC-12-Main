require('dotenv').config();

function required(name) {
	const value = process.env[name];
	if (!value)  throw new Error(`Missing env variable: ${name}`);
	return value;
}

const config = {
	port: process.env.PORT || 3000,
	mongoUri: required("MONGO_URI"),
	authStrategy: process.env.AUTH_STRATEGY || "session",
	session : {
		secret: required("SESSION_SECRET"),
	},
	jwt: {},
}
module.exports = {config};
