const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profileURL: {type: String, required: false, defualt: "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png" },
  
});

const User = mongoose.model("User", UserSchema);

//
module.exports = User;
