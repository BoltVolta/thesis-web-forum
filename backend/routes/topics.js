const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

const { getTopics, getTopicsById, createTopic, deleteTopicById, getTopicsByName } = require('../controllers/topics');
router.get('/', getTopics);
router.get('/get/:id', getTopicsById);
router.get('/search/:name', getTopicsByName);

router.use(verifyToken);

router.post('/create', createTopic);
router.delete('/delete/:id', deleteTopicById);

module.exports = router;