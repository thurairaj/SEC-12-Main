const express = require('express');
const userController = require('../controller/user.controller');
const router = express.Router();


// POST [/api/users]/
//          \
//         routes/index.js
router.post('/', userController.createUser)

module.exports = router;
