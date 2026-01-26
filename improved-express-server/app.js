const express = require('express');
const app = express();

const usersRouter = require('./routes/users');
const productRouter = require('./routes/product');

// Middleware
app.use(express.json())

app.use("/user", usersRouter)
app.use("/product", productRouter)

app.listen(3000, () => {
	console.log('Express server listening on port 3000');
})
