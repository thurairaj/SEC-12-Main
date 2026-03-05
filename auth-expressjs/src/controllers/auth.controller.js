const bcrypt = require('bcrypt');

const User = require('../models/User')
const {config} = require('../config/env');
const {registerSchema, loginSchema } = require("../validators/auth.validation");


async function register(req, res) {
	const parsed = registerSchema.safeParse(req.body);
	if (!parsed.success) {
		return res.status(400).send({error: "Invalid input", issues: parsed.error.issues});
	}

	const { name, email, password } = parsed;

	const existing = await User.findOne({email});
	if (existing) {
		return res.status(400).send({error: "Email already registered!"});
	}

	const passwordHash = await bcrypt.hash(password, 12);
	const user = await User.create({name, email, passwordHash});

	return res.status(200).send({
		id: user._id,
		name: user.name,
		email: user.email
	});


}

module.exports = {register};
