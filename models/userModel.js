const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "user needs username"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "user needs password"],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
