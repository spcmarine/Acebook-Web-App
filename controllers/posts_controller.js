var Post = require('../models/post.js');

var PostsController = {
  Index: function(req, res) {
    res.render('posts/index', { posts: Post.all() });
  },
  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    var post = new Post(req.body.message);
    post.save();
    res.status(201).redirect('/posts');
  }
};

module.exports = PostsController;
