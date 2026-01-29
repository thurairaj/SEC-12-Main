const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller');
const {createUserRequestSchema, getUserByIdSchema, listUserSchema} = require("../validations/user-request.schema");
const {validate} = require("../middlewares/validate");

router.post('/', validate(createUserRequestSchema), userController.createUser)
router.get('/', validate(listUserSchema), userController.listUsers)
router.get('/:id', validate(getUserByIdSchema), userController.getUserById)

module.exports = router;
