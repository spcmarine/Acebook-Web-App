var User = require('../models/user');

var UsersController = {
  New: function(req, res) {
    res.render('users/new', {});
  },

  Create: function(req, res) {
    var user = new User(req.body);
    user.save(function(err) {
      if (err) { throw err; }
      res.status(201).redirect('/posts');
    });
  }
};

module.exports = UsersController;
