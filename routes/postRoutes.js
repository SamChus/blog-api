const express = require('express');
const { createPost, deletePost } = require('../controllers/postControllers');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin')
const {upload} = require('../middlewares/multer')
const {clearMultipleFiles} = require('../middlewares/clearUpload')

const router = express.Router();

router.post("/createPost",upload.array("images", 5) ,auth , clearMultipleFiles ,createPost)
router.delete("/:id", auth ,deletePost)





module.exports = router;