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

module.exports = {
	createUser,
	getUserById
}
