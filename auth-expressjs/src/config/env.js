require('dotenv').config();

function required(name) {
	const value = process.env[name];
	if (!value)  throw new Error('Missing env variable');
	return value;
}

const config = {
	port: process.env.PORT || 3000,
	mongoUri: required(process.env.MONGO_URI),
	authStrategy: required(process.env.AUTH_STRATEGY),
	session : {
		secret: required(process.env.SESSION_SECRET),
	},
	jwt: {

	},
}
module.exports = {config};
