var posts = [];  // List of posts stored in memory for now

var Post = function(message) {
  this.message = message;
};

Post.prototype.save = function() {
  posts.push(this);
}

Post.all = function() {
  return posts;
}

module.exports = Post;
