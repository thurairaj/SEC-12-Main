function validate(schema) {
	return (req, res, next) => {
		const payload = {
			body: req.body,
			params: req.params,
			query: req.query,
		}

		try {
			schema.parse(payload);
			next();
		} catch (error) {
			error.statusCode = 400;
			error.isZodError = true;
			next(error);
		}
	}
}

module.exports = {validate};
