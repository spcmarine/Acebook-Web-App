const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    message: String
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;