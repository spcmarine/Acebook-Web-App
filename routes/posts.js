var express = require('express');
var router = express.Router();

var PostsController = require('../controllers/posts_controller')

router.get('/', PostsController.Index);
router.post('/', PostsController.Create);
router.get('/new', PostsController.New);

module.exports = router;
