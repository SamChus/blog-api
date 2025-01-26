const express = require("express");
const { test, createUser, loginUser, verifyEmail, uploadImage, profilePicture } = require("../controllers/userControllers");
const {upload} = require("../middlewares/multer");
const auth = require("../middlewares/auth");
const {clearSingleFile} = require('../middlewares/clearUpload')


const router = express.Router();

router.get("/", test);
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/verify-email", verifyEmail);

router.post("/upload-image", upload.single("files"), clearSingleFile ,uploadImage);
router.post("/profilePics", upload.single("image"), auth, clearSingleFile ,profilePicture)




module.exports = router;



// const clearUploadedFiles = (req, res, next) => {
//   res.on('finish', () => {
//     if (res.statusCode === 201) {
//       req.files.forEach(file => {
//         fs.unlink(path.join(__dirname, '../uploads', file.filename), err => {
//           if (err) { 
//             console.error(`Failed to delete file: ${file.filename}`, err);
//           }
//         });
//       });
//     }
//   });
//   next();
// };

// const clearUploadedFiles = (req, res, next) => {
//   res.on("finish", () => {
//     if (res.statusCode === 201) {
//       req.files.forEach((file) => {
//         fs.unlinkSync(file.path);
//       });
//     }
//   });
//   next();
// };
