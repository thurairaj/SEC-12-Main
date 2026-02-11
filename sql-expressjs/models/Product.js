const sequalize = require('../db')
const {DataTypes} = require("sequelize");

const Product = sequalize.define("products", {
	name: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	price: {
		type: DataTypes.DECIMAL(10, 2),
	}
})

module.exports = Product;
