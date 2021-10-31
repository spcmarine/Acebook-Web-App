var express = require('express');
var router = express.Router();

var SessionsController = require('../controllers/sessions');

router.get('/new', SessionsController.New);
router.post('/', SessionsController.Create);
router.delete('/', SessionsController.Destroy);

module.exports = router;
