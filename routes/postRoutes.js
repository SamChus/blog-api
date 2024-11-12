const express = require('express');
const { deletePost, createPost, getAllPost, getSinglePost, updatePost } = require('../controllers/postControllers');


const router = express.Router();


router.post('/createPost', createPost)
router.delete('/posts/:id', deletePost)
router.put('/posts/:id', updatePost)
router.get('/allpost', getAllPost)
router.get('/posts/:id', getSinglePost)


module.exports = router;    