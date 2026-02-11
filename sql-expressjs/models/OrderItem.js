const sequalize = require('../db')
const {DataTypes} = require("sequelize");

const OrderItem = sequalize.define("order_items", {
	quantity: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	}
}, { underscored: true, updatedAt: false, createdAt: false })

module.exports = OrderItem;
