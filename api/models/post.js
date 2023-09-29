const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: { type: String, required: true },
  likes: {
    type: Number,
    default: 0
    },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  image_url: String


});

const Post = mongoose.model("Post", PostSchema);


module.exports = Post;

