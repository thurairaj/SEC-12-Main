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
		.select("name email age status createdAt updatedAt")
		.sort(sort)
		.skip(skip)
		.limit(limit)
		.lean()

	setPaginationHeaders(res, {total, page, limit})
	res.json(users);
}

module.exports = {
	create, getPosts
}
