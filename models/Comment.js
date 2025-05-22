const mongoose = require("mongoose");

// schema 
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    timestamps: true
})

const Comment = mongoose.model("User", commentSchema);

module.exports = Comment;
