const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.post(
  "/search",
  [
    body("name")
      .isLength({ min: 2 })
      .withMessage("Name should be at least 2 characters long")
      .trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const name = req.body.name;
      const suggestions = await User.find({ name: { $regex: `^${name}`, $options: 'i' } })
        .limit(5);
      res.json({ suggestions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

module.exports = router;
