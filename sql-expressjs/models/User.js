const sequalize = require('../db')
const {DataTypes} = require("sequelize");

const User = sequalize.define("users", {
	name: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	email: {
		type: DataTypes.TEXT,
		allowNull: false,
		unique: true,
	}
})

module.exports = User;
