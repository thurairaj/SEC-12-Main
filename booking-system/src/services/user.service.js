const userRepo = require("../repository/user.repo")

function makeHttpError(statusCode, message) {
	const err = new Error(message);
	err.statusCode = statusCode;
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

async function listUsers(query) {
	const page = query.page || 1;
	const limit = query.limit || 3;
	// user?q=thu&pag=2
	const filterQuery = query.q?.trim()?.toLowerCase()

	 const all = await userRepo.findAll();
	const filtered = filterQuery
		? all.filter(user => {
		return user.name.toLowerCase().includes(filterQuery) ||
			user.email.toLowerCase().includes(filterQuery)})
		: all;



	const total = filtered.length;
	const start = (page - 1) * limit
	const items = filtered.slice(start, start+limit);

	return {
		items,
		meta: {
			page, limit, total, totalPages: Math.ceil(total / limit)
		}
	}


}

module.exports = {
	createUser,
	getUserById,
	listUsers
}
