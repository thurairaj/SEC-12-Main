const express = require('express');
const {Product} = require("../models");

const router = express.Router();

router.post('/', async (req, res) => {
	const product = await Product.create({
		name: req.body.name,
		price: parseFloat(req.body.price),
	});
	res.json(product)
})

router.get('/', async (req, res) => {
	const products = await Product.findAll()
	res.json(products);
})

module.exports = router;
