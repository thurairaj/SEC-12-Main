const userService = require("../services/user.service");
const { asyncHandler } = require("../utils/asyncHandler");

const createUser = asyncHandler(async (req, res) => {
	const user = await  userService.createUser(req.body);
	res.json({data: user});
})

const getUserById = asyncHandler(async (req, res) => {
	const user = await userService.getUserById(req.params.id);
	res.json({data: user});
})

const listUsers = asyncHandler(async (req, res) => {
	// /api/users?key1=value1,key2=value2
	const result = await userService.listUsers(req.query)
	res.json({data: result.items, pages: result.meta});
})

module.exports = {
	createUser,
	getUserById,
	listUsers,
}
