const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants = require("../constants/constants");
require("dotenv").config();

// Create and Save a new User
exports.create = async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      password: hashPassword,
    });
    const tokenDetails = {
      username: username,
    };
    const jwttoken = jwt.sign(tokenDetails, process.env.ACCESS_TOKEN_SECRET, {
      noTimestamp: true,
    });

    let responseObj = {
      token: jwttoken,
      usertype: "admin",
      isServicesSelected: false,
      isThemeSelected: false,
    };
    await user
      .save(user)
      .then((data) => {
        return res.json({
          user_id: data.user_id,
          username,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          err: "User already exists.",
        });
      });
  } catch (err) {
    return res.status(500).send({
      err: "Internal error please try again",
    });
  }
};

exports.authenticate = async (req, res) => {
  try {
    const { username, password } = req.body;
    await User.findOne({ where: { username } }).then(async (user, err) => {
      if (err || !user) {
        return res.status(400).json({
          error: "USER does not exists",
        });
      } else {
        if (user) {
          bcrypt.compare(password, user.password, (err, data) => {
            if (data) {
              const tokenDetails = {
                username: user.username,
                user_id: user.user_id,
              };
              const token = jwt.sign(
                tokenDetails,
                process.env.ACCESS_TOKEN_SECRET,
                {
                  noTimestamp: true,
                }
              );
              // send response to front end
              return res.json({
                token,
                user: {
                  username: user.username,
                  user_id: user.user_id,
                },
              });
            } else {
              return res.json({ error: "Wrong Password" });
            }
          });
        }
      }
    });
  } catch (error) {
    return res.status(500).send({
      err: "Internal error please try again",
    });
  }
};
