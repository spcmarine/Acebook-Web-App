var express = require('express');
var router = express.Router();

var posts = [];

/* GET posts listing. */
router.get('/', function(req, res, next) {
  res.render('posts/index', { posts: posts });
});

/* GET new post form. */
router.get('/new', function(req, res, next) {
  res.render('posts/new', {});
});

/* POST create new post. */
router.post('/', function(req, res, next) {
  var post = { message: req.body.message };
  posts.push(post);
  res.status(201).redirect('/posts');
});

module.exports = router;
