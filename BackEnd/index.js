const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

const PORT = process.env.PORT;

app.use(express.json());

app.use("/api", require("./routes/SignUp"));

app.use("/api", require("./routes/LogIn"));

app.use("/api", require("./routes/DisplayLocation"));

app.use("/api", require("./routes/SearchBar"));

app.use("/api", require("./routes/UpdateLocation"));

app.use(function (err, req, res, next) {
  res.json({ msg: "Sorry, Server not Responding" });
});

app.listen(PORT);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error.message);
  });
