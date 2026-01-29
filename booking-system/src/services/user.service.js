const userRepo = require("../repository/user.repo")

function makeHttpError(statusCode, message) {
	const err = new Error(message);
	err.status = statusCode;
	return err;
}

async function createUser(userCreateRequest) {
	const existing = await userRepo.findByEmail(userCreateRequest.email)
	if (existing) throw makeHttpError(400, `User with email ${userCreateRequest.email} already exists`);

	return userRepo.create({
		email: userCreateRequest.email,
		name: userCreateRequest.name,
		age: userCreateRequest.age,
	});
}

async function updateUser(userUpdateRequest) {}

async function getUserById(id) {
	const user = await userRepo.findById(id);
	if(!user) throw makeHttpError(400, `User with id ${id} not found`);
	return user;
}

module.exports = {
	createUser,
	getUserById
}
