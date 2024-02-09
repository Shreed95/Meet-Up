const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.post(
  "/displaylocation",
  [
    body("name", "Invalid Name").isLength({ min: 2 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    let name = req.body.name;
    try {
      let userData = await User.findOne({ name });
      let longitude = userData.location.lng;
      let latitude = userData.location.lat;
      let username = userData.name;
      res.json({ success: true, lat : latitude, lng : longitude, name : username  });
    } catch (err) {
      console.log(err);
      return res.json({ success: false });
    }
  }
);

module.exports = router;
