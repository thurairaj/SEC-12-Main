import express from "express";
const userController = require("../controllers/userController");

const router = express.Router();

// CRUD
router.post("/", userController.createUser)

module.exports = router;

