const {body, validationResult} = require('express-validator')

function userRules() {
	return [
		body('name').notEmpty().isString(),
		body('age').isInt({min: 0}),
		body('email').isString().isEmail(),
	]
}

function handleValidation(req, res, next) {
	const errors = validationResult(req);
	if (errors) {
		return res.status(400).json({errors: errors})
	}

	next();
}

module.exports = { userRules, handleValidation}
