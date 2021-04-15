const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/post");
require("dotenv").config();

mongoose
  .connect(process.env.dburi, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(
      err,
      "..................ERROR CONNECTING 2 DB..................................."
    );
  });
const app = express();
app.use(express.json());
app.get("/", (req, res, next) => {
  res.status(200).redirect("/posts");
});

app.use("/posts", postRoutes);
app.use("/uploads", express.static("uploads"));
app.use((req, res, next) => {
  res.status(404).json({
    message: "Resource NOT FOUND!......",
  });
});
app.listen(3001, () => {
  console.log("listening");
});
