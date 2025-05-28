const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "FullStack-blog-project",
        allowedFormats: ["jpeg", "png", "jpg"]
    }
});

const upload = multer({ storage });

module.exports = upload;


