const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const UsersController = {
  Create: (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        const user = new User(req.body);
        user.save((err) => {
          if (err) {
            res.status(400).json({ message: 'Bad request' });
          } else {
            res.status(201).json({ message: 'OK' });
          }
        });
      } else {
        console.log("User exists!")
        res.status(409).json({ message: 'User already exists' });
      }
    });
  },
  Index: (req, res) => {
    User.find((err, user) => {
        if (err) {
            throw err;
        }

        res.status(200).json({ user: user});
    })
},
};


module.exports = UsersController;
