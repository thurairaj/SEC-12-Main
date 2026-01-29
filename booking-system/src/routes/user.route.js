const express = require('express');
const userController = require('../controller/user.controller');
const {createUserRequestSchema, getUserByIdSchema} = require("../validations/user-request.schema");
const router = express.Router();


// POST [/api/users]/
//          \
//         routes/index.js
// (res, res, next) => {}
router.post('/', validate(createUserRequestSchema), userController.createUser)
router.get('/:id', validate(getUserByIdSchema), userController.getUserById)

module.exports = router;
