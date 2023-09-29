const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    message: { type: String, required: true },
    likes: {
        type: Number,
        default: 0
        },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;