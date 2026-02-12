const sequalize = require('../db')
const {DataTypes} = require("sequelize");

const User = sequalize.define("User", {
	name: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	email: {
		type: DataTypes.TEXT,
		allowNull: false,
		unique: true,
	},
	updatedAt: {
		type: DataTypes.DATE,
		allowNull: true,
		defaultValue: DataTypes.NOW,
	}
}, { underscored: true, updatedAt: false, tableName: 'users' })

module.exports = User;
