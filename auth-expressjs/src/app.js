const express = require('express');
const cookieParser = require('cookie-parser');
const { config } = require('./config/env');
const {sessionMiddleware } = require('./config/session');

const authRoutes = require('./routes/auth.routes');
const protectedRoutes = require('./routes/protected.routes');

function createApp() {
	const app = express();

	app.use(express.json())
	app.use(cookieParser());

	if (config.authStrategy === 'session') {
		app.use(sessionMiddleware());
	}

	app.use("/auth", authRoutes);
	app.use("/protected", protectedRoutes);

	app.use((err, req, res, next) => {
		console.log(err);
		res.status(500).json({message: err.message});
	})

	return app;
}

module.exports = {createApp};
