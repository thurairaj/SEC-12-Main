const bcrypt = require('bcrypt');

const User = require('../models/User')
const {config} = require('../config/env');
const {registerSchema, loginSchema } = require("../validators/auth.validation");


async function register(req, res) {
	const parsed = registerSchema.safeParse(req.body);
	if (!parsed.success) {
		return res.status(400).send({error: "Invalid input", issues: parsed.error.issues});
	}

	const { name, email, password } = parsed.data;

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

async function login(req, res) {
	const parsed = loginSchema.safeParse(req.body);
	if (!parsed.success) {
		return res.status(400).send({error: "Invalid input", issues: parsed.error.issues});
	}

	const { email, password } = parsed.data;

	const user = await User.findOne({email});
	if (!user) {
		return res.status(401).json({message: "Invalid credentials"});
	}

	const ok = await bcrypt.compare(password, user.passwordHash);
	if (!ok) {
		return res.status(401).json({message: "Invalid credentials"});
	}

	if (config.authStrategy === 'session') {
		// session = { userId: 'something' }
		req.session.userId = String(user._id);
		req.session.date = (new Date()).toISOString();
		return res.json({
			message: "You are logged in",
			user: {id: user._id, name: user.name, email: user.email},
		})
	} else {
		// jwt
	}

}

function logout(req, res) {
	if (config.authStrategy === 'session') {
		req.session.destroy(()=> {
			res.clearCookie("connect.sid", {path: "/"});
			return res.json({success: "Logged out"});
		})
	}
}

async function me(req, res) {
	const userId = req.auth?.userId;
	const user = await User.findById(userId).select('name email createdAt');

	if (!user) {
		return res.status(404).send({message: "User not found"});
	}

	return res.json({user});
}

module.exports = {register, login, logout, me};
