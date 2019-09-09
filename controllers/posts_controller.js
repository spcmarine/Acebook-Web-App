var Post = require('../models/post.js');

var PostsController = {
  Index: function(req, res, next) {
    res.render('posts/index', { posts: Post.all() });
  },
  New: function(req, res, next) {
    res.render('posts/new', {});
  },
  Create: function(req, res, next) {
    var post = new Post(req.body.message);
    post.save();
    res.status(201).redirect('/posts');
  }
};

module.exports = PostsController;
