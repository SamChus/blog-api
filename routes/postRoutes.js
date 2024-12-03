const express = require('express');
const { createPost } = require('../controllers/postControllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post("/createPost", auth ,createPost)





module.exports = router;