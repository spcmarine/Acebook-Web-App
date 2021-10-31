var User = require('../models/user');

var SessionsController = {
  New: function(req, res) {
    res.render('sessions/new', {});
  },

  Create: function(req, res) {
    console.log('trying to log in')
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email: email}).then(
      (user) => {
        if(!user) {
          res.redirect('/sessions/new');
        } else if(user.password != password) {
          res.redirect('/sessions/new');
        } else {
          req.session.user = user;
          res.redirect('/posts');
        }
      }
    )
  },

  Destroy: function(req, res) {
    console.log('logging out')
    if (req.session.user && req.cookies.user_sid) { 
      res.clearCookie('user_sid');
    }
    res.redirect('/sessions/new');
  }
};

module.exports = SessionsController;
