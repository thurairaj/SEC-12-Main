const express = require('express');
const {User, Order, Product} = require("../models");
const generateCSV = require('../services/report.services');

const router = express.Router();

router.post('/', async (req, res) => {
	const user = await User.findByPk(req.body.userId);
	const order = await user.createOrder({
		amount: req.body.amount,
	})
	res.json(order);
})

router.get('/', async (req, res) => {
	const orders = await Order.findAll({
		include: [User, {model: Product, through: { attributes: []}}]
	})

	res.json(orders);
})


router.get("/report/csv", async (req, res) => {
	const data = await Order.findAll({
		include: [{model: User, attributes: ['name']}]
	})

	const filePath = await generateCSV(data);
	res.download(filePath)
})

module.exports = router;
