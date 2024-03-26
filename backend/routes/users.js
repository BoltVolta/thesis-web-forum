const express = require('express');
const router = express.Router();

const { loginUser, signUpUser, getUsers, getUserById } = require('../controllers/users');

router.get('/', getUsers);
router.get('/get/:id', getUserById)
router.post('/signup', signUpUser);
router.post('/login', loginUser);

module.exports = router;