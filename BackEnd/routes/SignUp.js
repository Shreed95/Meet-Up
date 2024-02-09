const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

router.post(
  "/signup",
  [
    body("name", "Invalid Username").isLength({ min: 2 }),
    body("email", "Invalid Email").isEmail(),
    body("password", "Invalid Password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    let email = req.body.email;
    let name = req.body.name;
    try {
      let userData = await User.findOne({ email });
      if (userData) {
        return res
          .status(400)
          .json({ errors: "User With Same E-mail Address Exists" });
      }
      let userdata = await User.findOne({ name });
      if (userdata) {
        return res
          .status(400)
          .json({ errors: "User With Same Username Exists" });
      }
    } catch (err) {
      console.log(err);
      return res.json({ success: false });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        location : req.body.location
      });
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      return res.json({ success: false });
    }
  }
);

module.exports = router;