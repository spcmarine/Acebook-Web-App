var express = require('express');
var router = express.Router();

var HomePageController = require('../controllers/home_page_controller.js');

router.get('/', HomePageController.Index);

module.exports = router;
