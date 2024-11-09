const express = require('express');
const { deletePost, createPost } = require('../controllers/postControllers');

const router = express.Router();


router.post('/createPost', createPost)
router.delete('/posts/:id', deletePost)

module.exports = router;    