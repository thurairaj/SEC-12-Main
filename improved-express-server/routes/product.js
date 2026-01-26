const express = require('express');
const router = express.Router();

//define endpoints
router.get('/', (req, res) => {
	res.send('Welcome to the Product');
})

module.exports = router;
