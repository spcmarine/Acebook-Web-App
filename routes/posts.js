var express = require('express');
var router = express.Router();
var Post = require('../models/post.js')

/* GET posts listing. */
router.get('/', function(req, res, next) {
  res.render('posts/index', { posts: Post.all() });
});

/* GET new post form. */
router.get('/new', function(req, res, next) {
  res.render('posts/new', {});
});

/* POST create new post. */
router.post('/', function(req, res, next) {
  var post = new Post(req.body.message);
  post.save();
  res.status(201).redirect('/posts');
});

module.exports = router;
