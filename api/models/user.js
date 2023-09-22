const mongoose = require("mongoose");
const uuid = require("uuid");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profileURL: {type: String, required: false },
  _id: {type: String, default: uuid.v1},
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
