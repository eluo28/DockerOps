const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashpassword = await bcrypt.hash(password, 12);

    const newUser = User.create({ username, password: hashpassword });

    req.session.user = newUser;

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: "fail",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "user not found",
      });
    } else {
      if (await bcrypt.compare(password, user.password)) {
        req.session.user = user;
        res.status(201).json({
          status: "success",
        });
      } else {
        return res.status(404).json({
          status: "fail",
          message: "incorrect password",
        });
      }
    }
  } catch (e) {
    res.status(404).json({
      status: "fail",
      message: e,
    });
  }
};
