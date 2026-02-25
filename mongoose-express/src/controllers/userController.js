const User = require('../models/User');
const e = require("express");
const ResourceNotFoundError = require("../errors/ResourceNotFoundError");


/*
	pageNumber , pageLimit, totalContents, totalPages
 */
function setPaginationHeaders(res, {total, page, limit}){
	res.setHeader("x-page", page.toString());
	res.setHeader("x-limit", limit.toString());
	res.setHeader("x-total-count", total.toString());
	res.setHeader("x-total-page", Math.ceil(total / limit).toString());
}

function getPaginationHeaders(req){
	const page = parseInt(req.headers["x-page"]) || 1
	const limit = parseInt(req.headers["x-limit"]) || 100

	return {page, limit}
}

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
	console.log(req);
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

/**
 * status, minAge, sortBy age or createdAt
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
async function getUsers(req, res,  next) {
	try {
		const {page, limit} = getPaginationHeaders(req);
		const skip = (page - 1) * limit;

		const filter = {};
		if (req.query.status)  filter.status = req.query.status;
		if (req.query.minAge) filter.age = { $gte : parseInt(req.query.minAge)}
		if(req.query.q) filter.$text = { $search : req.query.q.toString() };

		const sort = req.query.sort ? req.query.sort : "-createdAt";

		const total = await User.countDocuments(filter)

		const users = await User.find(filter)
			.select("name email age status createdAt updatedAt")
			.sort(sort)
			.skip(skip)
			.limit(limit)
			.lean()

		setPaginationHeaders(res, {total, page, limit})
		res.json(users);

	} catch (err) {
		next(err)
	}
}

module.exports = { createUser, getUserById, getUsers};
