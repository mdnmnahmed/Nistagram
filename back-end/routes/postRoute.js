const express = require('express');
const { createPost, allPosts, userProfilePosts } = require('../controllers/postController');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin')

router.post('/create_post', requireLogin, createPost);
router.get('/all_posts', requireLogin, allPosts);


module.exports = router;