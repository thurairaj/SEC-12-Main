module.exports = function errorHandler(err, req, res, next) {
	console.log(err);

	if (err.name === 'ResourceNotFoundError') {
		return res.status(err.statusCode).send({
			"message": `Resource Not Found: ${err.message}`,
		})
	}

}
