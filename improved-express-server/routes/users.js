const express = require('express');
const {userRules, handleValidation} = require("../validators/userValidation");
const {body} = require("express-validator");
const router = express.Router();

const users = [];

router.post('/', [
	body('name').notEmpty().isString(),
	body('age').isInt({min: 0}),
	body('email').isString().isEmail(),
], handleValidation, (req, res) => {
	const userCreationRequest = req.body;
	const user = {};
	user.name = userCreationRequest.name;
	user.username = userCreationRequest.username;
	user.age = userCreationRequest.age;
	user.phoneNumber = userCreationRequest.phoneNumber;
	user.email = userCreationRequest.email;
	user.id = Date.now().toString();
	users.push(user);
	res.status(200).json(user)
})

// READ ALL
router.get('/',  (req, res) => {
	const age = req.query.age || 0;

	if (isNaN(parseInt(age)))
		return res.status(404).json({status: 'error', message: 'age should be a number'});

	const result = users.filter(user => user.age >= age);
	res.status(200).json(result)
})

// READ ONE USER?
router.get('/:id', (req, res) => {
	const userId = req.params.id;
	const user = users.find(user => user.id === userId)
	if (user) {
		res.status(200).json(user)
	} else {
		res.status(404).end()
	}
})



router.put('/:id', (req, res) => {
	const userId = req.params.id;
	const payload = req.body;
	const user = users.find(user => user.id === userId)
	if (user) {
		user.name = payload.name;
		res.status(200).json(user)
	} else {
		res.status(404).end()
	}
})

router.delete('/:id', (req, res) => {
	const userId = req.params.id;
	const user = users.find(user => user.id === userId);
	if (user) {
		const indexOfUser = users.findIndex(user => user.id === userId)
		users.splice(indexOfUser, 1);
	}
	res.status(200).json(user)
})

module.exports = router;
