const express = require('express');
const {User, Order} = require("../models");
const {fn, col} = require("sequelize");

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
	try {
		const user = await User.create({
			name: req.body.name,
			email: req.body.email,
		});
		res.json({data: user});
	} catch (e) {
		console.log(e, "Create user error")
	}
})

// READ with Pagination
router.get('/', async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 5;
		const users = await User.findAll({
			limit: limit,
			offset: (page - 1) * limit,
		})

		res.json(users);
	} catch (e) {
		console.log(e, "error in reading users")
	}
})


// DELETE
router.delete('/:id', async (req, res) => {
	try {
		await User.destroy({ where: { id: req.params.id } })
		res.json({status: 'success'})
	} catch (e) {
		console.log(e, 'Delete user')
	}

})


// User's total spend
router.get('/spending', async (req, res) => {
	try {
		const data = await User.findAll({
			attributes: [
				"name",
				[fn("SUM", col("Orders.amount")), "totalSpent"],
				[fn("COUNT", col("Orders.id")), "totalOrders"]
			],
			include: [{ model: Order, attributes: []}],
			group: ["User.id"],
		});

		res.json(data);
	} catch (e) {
		console.log(e);
	}
})

module.exports = router;


/*
	user 1 -> order_id 1
	user 1 -> order_id 7
 */
