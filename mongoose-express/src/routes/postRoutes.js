const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();
router.get('/', postController.getPosts);
router.post('/', postController.create);
router.get('/stats/posts-per-author', postController.getPostsPerAuthor);

module.exports = router;
