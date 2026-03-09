const jwt = require('jsonwebtoken');
const { config } = require('../config/env');

function requireAuth(req, res, next) {
	if (config.authStrategy === 'session') {
		console.log(req.session)
		if(!req.session?.userId) {
			return res.status(401).send({message: "Mot authenticated"})
		}

		req.auth = { userId: req.session.userId, strategy: "session"};
	} else if (config.authStrategy === 'jwt'){
		// Authorization: Bearer header.payload.signature  (token)
		const auth = req.headers.authorization
		const token = auth?.slice("Bearer ".length)
		if (!token) {
			return res.status(401).send({message: "Mot authenticated"})
		}

		try {
			const payload = jwt.verify(token, config.jwt.secret);
			req.auth = { userId: payload.userId, strategy: "jwt" };
		} catch (err) {}
	}

	return next();

}

module.exports = {requireAuth};
