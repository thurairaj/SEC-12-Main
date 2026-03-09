const session = require('express-session');
const MongoStore = require('connect-mongo');
const { config } = require('./env');

function sessionMiddleware() {
	return session({
		secret: config.session.secret,
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			secure: false,
			sameSite: 'none',
			maxAge: 7*24*60*60*1000,
		},
		store: MongoStore.create({
			mongoUrl: config.mongoUri,
			collection: 'sessions',
			ttl: 7*24*60*60
		})
	})
}

module.exports = { sessionMiddleware }
