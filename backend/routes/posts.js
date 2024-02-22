const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

const { getPosts, getPostsById, createPost, deletePostById, updateLikes, editPost } = require('../controllers/posts');
router.get('/', getPosts);
router.get('/:id', getPostsById);

router.use(verifyToken);

router.post('/', createPost);
router.patch('/:id/edit', editPost);
router.patch('/:id/like', updateLikes);
router.delete('/:id', deletePostById);

module.exports = router;