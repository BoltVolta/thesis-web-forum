const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

const { getPosts, getPostsById, createPost, deletePostById, updateLikes, editPost, deletePostByTopicId, getPostsByTopicId } = require('../controllers/posts');
router.get('/', getPosts);
router.get('/:id', getPostsById);
router.get('/byTopic/:id', getPostsByTopicId);

router.use(verifyToken);

router.post('/', createPost);
router.patch('/:id/edit', editPost);
router.patch('/:id/like', updateLikes);
router.delete('/delete/:id', deletePostById);
router.delete('/del-by-topic/:id', deletePostByTopicId)

module.exports = router;