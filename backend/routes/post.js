const express = require('express');
const postControllers = require('../controllers/post');
const { authUser } = require('../middlewares/auth');

const router = express.Router();

router.post('/createPost', authUser, postControllers.createPost);
router.get('/getAllPosts', authUser, postControllers.getAllPosts);
router.put('/comment', authUser, postControllers.comment);

module.exports = router;
