const express = require("express");
const { getPostForm, createPost } = require("../controllers/postContoller");
const upload = require("../config/multer");

const postRoutes = express.Router();

postRoutes.get("/add", getPostForm)

postRoutes.post("/add", upload.array("image", 5), createPost);

module.exports = postRoutes;