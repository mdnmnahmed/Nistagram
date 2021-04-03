const express = require('express');
const { createPost } = require('../controllers/postController');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin')

router.post('/create_post',requireLogin, createPost);

module.exports = router;