const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/post");
require("dotenv").config();

const app = express();
app.get("/", (req, res, next) => {
  res.status(200).redirect("/posts");
});
app.use("/posts", postRoutes);
app.listen(3001, () => {
  console.log("listening");
});
