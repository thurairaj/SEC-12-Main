const sequalize = require('../db')
const {DataTypes} = require("sequelize");

const OrderItem = sequalize.define("orderItems", {
	quantity: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	}
}, { underscored: true,  updatedAt: false, createdAt: false, tableName:'order_items' })

module.exports = OrderItem;
