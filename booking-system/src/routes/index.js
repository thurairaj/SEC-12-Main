const express = require('express');
const userRoutes = require('./user.route');

const router = express.Router();
router.use('/users', userRoutes);
//   /api/users

module.exports = router;
