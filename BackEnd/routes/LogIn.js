const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;
require("dotenv").config();

router.post(
  "/login",
  [
    body("name", "Invalid Name").isLength({ min: 2 }),
    body("password", "Invalid Password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    let name = req.body.name;
    try {
      let userData = await User.findOne({ name });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try Logging-In with Correct Credentials." });
      }
      const passCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!passCompare) {
        return res.status(400).json({ errors: "Incorrect Password" });
      }
      const data = {
        user: {
          id: userData._id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret, { expiresIn: "1d" });
      res.json({ success: true, authToken: authToken, name: userData.name });
    } catch (err) {
      console.log(err);
      return res.json({ success: false });
    }
  }
);

module.exports = router;
