const express = require('express');
const {requireAuth} = require('../middleware/requireAuth');

const router = express.Router();

router.get("/secret", requireAuth, (req, res) => {
	res.json({
		message: "Welcome to the Protected Endpoint",
		auth: req.auth
	})
})

module.exports = router;
