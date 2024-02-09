const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
const jwtSecret = process.env.JWTSECRET;

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization Token Required." });
  }
  const token = authorization.split(" ")[1];
  try {
    const id = jwt.verify(token, jwtSecret);
    const _id = id.user.id;
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not Authorized." });
  }
};

module.exports = requireAuth;
