var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
