const express = require('express');
const {register, me, login, logout} = require('../controllers/auth.controller');
const {requireAuth} = require('../middleware/requireAuth');

const router = express.Router();

// public endpoint
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// private endpoint
router.post('/me', requireAuth, me);

module.exports = router;
