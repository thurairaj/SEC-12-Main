const Post = require("../models/Post");
const {getPaginationHeaders, setPaginationHeaders} = require("../utils/helper");

async function create(req, res, next) {
	try {
		const {title, content, published, tags, author} = req.body;
		const post = await Post.create({
			title, content, published, tags, author
		})
		return res.status(201).send(post);
	} catch (err) {
		next(err);
	}
}

async function getPosts(req, res,  next) {
	const {page, limit} = getPaginationHeaders(req);
	const skip = (page - 1) * limit;

	const filter = {};
	if (req.query.published)  filter.published = req.query.published;
	if(req.query.authorId) filter.author = req.query.authorId;
	const total = await Post.countDocuments(filter)

	const sort = req.query.sort ? req.query.sort : "-createdAt";

	const users = await Post.find(filter)
		.sort(sort)
		.skip(skip)
		.limit(limit)
		.lean()

	setPaginationHeaders(res, {total, page, limit})
	res.json(users);
}

async function getPostsPerAuthor(req, res,  next) {
	const result = await Post.aggregate([
		{ $group:  { _id: "$author",  totalPosts: { $sum: 1 } } },
		{ $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "author" } },
		{ $unwind: { path: "$author" } },
		{$project: {_id: 0, totalPosts: 1,  authorId: "$author._id", authorName: "$author.name",  authorEmail: "$author.email" }}
	])
	res.json(result)
}

module.exports = {
	create, getPosts,getPostsPerAuthor
}
