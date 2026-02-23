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

userSchema.index({email: 1});
userSchema.index({status: 1, createdAt: -1});
userSchema.index({status: 1, age: -1});
userSchema.index({name: "text", email: "text"})

module.exports = mongoose.model("User", userSchema);
