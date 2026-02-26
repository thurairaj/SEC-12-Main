const express = require('express');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
	res.json({status: 'ok'})
})

// routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// middleware for error handling
app.use(errorHandler)


module.exports = app;
