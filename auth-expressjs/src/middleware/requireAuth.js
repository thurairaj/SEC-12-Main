const jwt = require('jsonwebtoken');
const { config } = require('../config/env');

function requireAuth(req, res, next) {
	if (config.authStrategy === 'session') {
		if(req.session?.userId) {
			return res.status(401).send({message: "Mot authenticated"})
		}

		req.auth = { userId: req.session.userId, strategy: "session"};
		return next();
	}

}

module.exports = {requireAuth};
