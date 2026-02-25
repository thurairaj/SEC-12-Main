class ResourceNotFoundError extends Error {
	constructor(message) {
		super(message);
		this.name = 'ResourceNotFoundError';
		this.statusCode = 404
	}
}

module.exports = ResourceNotFoundError;
