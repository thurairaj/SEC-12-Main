function errorHandler(err, req, res, next) {
	const status = err.statusCode || 500;
	if (err.isZodError) {
		res.status(400).json({
			error: {
				message: "Validation failed.",
				details: err.issues.map(e => ({
					path: e.path.join('.'),
					message: e.message,
				}))
			}
		});
	}

	res.status(status).json({
		error: {
			message: status === 500 ? "Internal Server Error": err.message,
		}
	})
}

module.exports = { errorHandler}
