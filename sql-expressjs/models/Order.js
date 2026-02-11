const sequalize = require('../db')
const {DataTypes} = require("sequelize");

const Order = sequalize.define("orders", {
	amount: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	country: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	status: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue: 'pending'
	}
}, { underscored: true, updatedAt: false })

module.exports = Order;
