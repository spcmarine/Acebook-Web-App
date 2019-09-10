var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String,
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
