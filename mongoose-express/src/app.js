const express = require('express');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
	res.json({status: 'ok'})
})

// routes
app.use("/api/users", userRoutes);

// middleware for error handling
app.use(errorHandler)


module.exports = app;
