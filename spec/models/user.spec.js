var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');

describe('User model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.users.drop(function() {
          done();
      });
  });

  it('has an email address', function() {
    var user = new User({email: 'someone@example.com', password: 'password' });
    expect(user.email).toEqual('someone@example.com');
  });

  it('has a password', function() {
    var user = new User({email: 'someone@example.com', password: 'password' });
    expect(user.password).toEqual('password');
  });

  it('can list all users', function(done) {
    User.find(function(err, users) {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it('can save a user', function(done) {
    var user = new User({email: 'someone@example.com', password: 'password' });

    user.save(function(err) {
      expect(err).toBeNull();

      User.find(function(err, users) {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({email: 'someone@example.com', password: 'password' });
        done();
      });
    });
  });
});
