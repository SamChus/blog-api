const express = require('express');
const { deletePost, createPost, updatePost } = require('../controllers/postControllers');

const router = express.Router();


router.post('/createPost', createPost)
router.delete('/posts/:id', deletePost)
router.put('/posts/:id', updatePost)

module.exports = router;    