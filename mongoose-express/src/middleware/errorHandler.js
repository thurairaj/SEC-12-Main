module.exports = function errorHandler(err, req, res, next) {
	console.log(err);

	if (err.name === 'ResourceNotFoundError') {
		return res.status(err.statusCode).json({
			"message": `Resource Not Found: ${err.message}`,
		})
	}

	if (err.name === 'CastError') {
		return res.status(400).json({
			"message": `CastError: ${err.message}`,
		})
	}

	if (err.name === 'ValidationError') {
		return res.status(400).json({
			message: `Validation Error: ${err.message}`,
			errors: Object.values(err.errors).map(e => e.message)
		})
	}

	return res.status(500).json({
		message: err.message,
	})

}
