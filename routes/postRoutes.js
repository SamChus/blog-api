const express = require('express');
const { deletePost } = require('../controllers/postControllers');

const router = express.Router();



router.delete('/posts/:id', deletePost)

module.exports = router;