const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: { type: String, required: [true, "Name is required"] },
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true,
		trim: true,
		lowercase: true
	},
	age: { type: Number, min: [18, "Age must be at least 18"] },
	status: {type: String, enum: ["active", "inactive"], default: "active"},
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
