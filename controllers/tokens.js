const User = require("../models/user");
const JWT = require("jsonwebtoken");

const SessionsController = {

  Create: (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        res.status(401).json({ message: "auth error" });
      } else if (user.password != password) {
        res.status(401).json({ message: "auth error" });
      } else {
        const token = JWT.sign({ user_id: user.id }, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({token: token, message: "OK"});
      }
    });
  },

  Destroy: (req, res) => {
    console.log("logging out");
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie("user_sid");
    }
    res.redirect("/sessions/new");
  },
};

module.exports = SessionsController;
