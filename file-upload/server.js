require("dotenv").config();
const express = require('express');
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/uploads', uploadRoutes);

const PORT = 3000;
app.listen(PORT, () => {
	const crypto = require('crypto');
	const secret = crypto.randomBytes(64).toString('hex');
	console.log(secret);
	console.log("Server is running on port " + PORT);
})

