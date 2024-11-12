const express = require('express');
const { deletePost, createPost } = require('../controllers/postControllers');

const router = express.Router();


router.post('/createPost', createPost)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)
router.get('/allpost', getAllPost)
router.get('/:id', getSinglePost)


module.exports = router;    