const mongoose = require('mongoose');

const postScheme = new mongoose.Schema({
	title: {type: String, required: [true, "Title is required"], trim: true},
	content: {type: String, default: ""},
	published: {type: Boolean, default: false},
	tags: {type: [String], default: []},
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, {timestamps: true});

postScheme.index({ author: 1 });
postScheme.index({published: 1, createdAt: 1});
postScheme.index({title: "text", content: "text"});

postScheme.pre('find', function(next) {
	this.populate("author", "name email status")
	next();
})

module.exports = mongoose.model("Post", postScheme);

