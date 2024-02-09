const express = require("express");
const User = require("../models/User");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.put("/updatelocation", async (req, res) => {
  try {
    const { name, lat, lng } = req.body;

    const result = await User.updateOne(
      { name: name },
      { $set: { location: { lat: lat, lng: lng } } }
    );

    res.json(result);
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;