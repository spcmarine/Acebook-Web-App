const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  profilePic: {
      data: Buffer,
      contentType: String,
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
