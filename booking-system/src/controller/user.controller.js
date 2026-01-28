const userService = require("../services/user.service");

const createUser = asyncHandler(async (req, res) => {
	const user = await  userService.createUser(req.body);
	res.status(201).json({data: user});
})

module.exports = {
	createUser
}
