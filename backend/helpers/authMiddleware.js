const jwt = require("jsonwebtoken");
const constants = require("../constants/constants");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(constants.FORBIDDEN)
        .send({ err: constants.USER_NOT_AUTHORIZED });
    }
    await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, user) => {
        if (err) {
          return res
            .status(constants.UNAUTHORIZED)
            .send({ err: constants.USER_NOT_AUTHORIZED });
        } else {
          res.user = user;
          return next();
        }
      }
    );
  } catch (err) {
    return res.status(500).send({
      err: "Some error occurred while fetching Service details.",
    });
  }
};
