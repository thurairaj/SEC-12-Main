const sequalize = require('../db')
const {DataTypes} = require("sequelize");

const Product = sequalize.define("Product", {
	name: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	price: {
		type: DataTypes.DECIMAL(10, 2),
	}
}, {  updatedAt: false, tableName: 'products', createdAt: false })

module.exports = Product;
