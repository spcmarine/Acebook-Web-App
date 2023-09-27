const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    message: String,
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;