const User = require('../models/User');
const e = require("express");
const ResourceNotFoundError = require("../errors/ResourceNotFoundError");

async function createUser(req, res,  next) {
	try {
		const {name, email, age, status} = req.body;
		const user = await User.insertOne({name, email, age, status}); //insertOne
		res.status(201).send(user);
	} catch (e) {
		console.log(e);
		next(e)
	}
}


// users/:id
async function getUserById(req, res,  next) {
	try {
		const user = await User.findById(req.params.id)
			.select('name email age status createdAt updatedAt')
			.lean()

		if (!user) {
			next(new ResourceNotFoundError("User not found"));
		}
		res.json(user);
	} catch (err) {
		next(err)
	}
}

module.exports = { createUser, getUserById};
