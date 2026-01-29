const users = [
	{
		id: "u1",
		name: "Thurairaj",
		email: "thurairaj@gmail.com",
		age: 33,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	}
]

async function create(data) {
	const now = new Date().toISOString();
	const user = {
		...data,
		id: new Date().getTime(),
		createdAt: now,
		updatedAt: now,
	}
	users.push(user)
	return user;
}

async function findByEmail(email) {
	return users.find((user) => user.email === email);
}

async function findById(id) {
	return users.find((user) => user.id === id);
}

module.exports = {
	findByEmail,
	findById,
	create
}
