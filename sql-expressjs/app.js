const express = require('express');
const userRoutes = require('./routes/users.routes');
const productRoutes = require('./routes/products.routes');
const orderRoutes = require('./routes/orders.route');
require('./models')

const app = express();

app.use(express.json());

app.use("/users", userRoutes)
app.use("/products", productRoutes)
app.use("/orders", orderRoutes)

module.exports = app;
