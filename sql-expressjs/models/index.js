const User = require('./user');
const Order = require('./order');
const Product = require('./product');
const OrderItem = require('./OrderItem');

/**
 * ONE-to-MANY
 * user -> orders
 */
Order.belongsTo(User)
User.hasMany(Order)


/**
 * MANY - to - MANY
 * order <-> product
 */
Order.belongsToMany(Product, {through: OrderItem})
Product.belongsToMany(Order, {through: OrderItem})

module.exports = {User, Order, OrderItem, Product};
