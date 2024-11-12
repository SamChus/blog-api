const express = require('express');
const { deletePost, createPost, getAllPost, getSinglePost } = require('../controllers/postControllers');

const router = express.Router();


router.post('/createPost', createPost)
router.delete('/posts/:id', deletePost)
router.get('/allpost', getAllPost)
router.get('/posts/:id', getSinglePost)

module.exports = router;    