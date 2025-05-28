
const Post = require("../models/Post");

exports.getPostForm = (req, res) => {
    res.render("newPost", {
        title: "newPost",
        user: req.user,
        error: ""
    });
}


// create a new post 
exports.createPost = async (req, res) => {
    const {title, content } = req.body;
    const newPost = await Post.create({
        title,
        content,
        author: req.user._id,
    })
    res.redirect("/posts");
}