const express = require('express');
const router = express.Router();

const { loginUser, signUpUser, getUsers } = require('../controllers/users');

router.get('/', getUsers);
router.post('/signup', signUpUser);
router.post('/login', loginUser);

module.exports = router;