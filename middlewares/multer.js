const multer = require("multer")
const fs = require("fs")
// const { CloudinaryStorage } = require('multer-storage-cloudinary')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    }
})


const upload = multer({ storage })




module.exports = { upload }

// const memoryStorage = multer.memoryStorage()

// const uploadMemory = multer({ storage: memoryStorage })

// module.exports = { uploadMemory, uploadCloudinary }


// const cloudinaryStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'uploads',
//         format: async (file) => 'png', // supports promises as well
//         public_id: (file) => file.originalname,
//     },
// })

// const uploadCloudinary = multer({ storage: cloudinaryStorage })

// module.exports = { uploadCloudinary }
