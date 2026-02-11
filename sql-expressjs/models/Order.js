const sequalize = require('../db')
const {DataTypes} = require("sequelize");

const Order = sequalize.define("orders", {
	amount: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	status: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue: 'pending'
	}
})

module.exports = Order;
