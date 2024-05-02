const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

const { getPosts, getPostsById, createPost, deletePostById, addLike, editPost, deletePostByTopicId, getPostsByTopicId, getPostCount } = require('../controllers/posts');

router.get('/', getPosts);
router.get('/:id', getPostsById);
router.get('/byTopic/:id', getPostsByTopicId);
router.get('/countByTopic/:id', getPostCount);

router.use(verifyToken);

router.post('/create', createPost);
router.patch('/edit/:id', editPost);
router.patch('/like/:id', addLike);
router.delete('/delete/:id', deletePostById);
router.delete('/del-by-topic/:id', deletePostByTopicId)

module.exports = router;