const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: {
      lat: { type: Number },
      lng: { type: Number },
    },
    required: true,
  }
});


module.exports = mongoose.model("User", UserSchema);
