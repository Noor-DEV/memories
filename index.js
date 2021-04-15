const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/post");
const cors = require("cors");

mongoose
  .connect(process.env.dburi, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res, next) => {
  res.status(200).json({
    info: "This is an API that offers posts that were posted by random users",
    routes: "/posts, /posts/:id",
    methods: "GET, POST, PATCH, DELETE",
    post: {
      _id: "",
      title: "POST_TITLE",
      name: "NAME_OF_THE_USER_THAT_POSTED_IT",
      message: "INFO_ABOUT_POST",
      file: "AN IMAGE URL",
      tags: ["fashion", "sports", "tech"],
    },
    posts: ["CONTAINS_POST_OBJECTS..LIKE THE ONE ABOVE.."],
  });
});
app.use("/posts", postRoutes);
app.use((req, res, next) => {
  const err = new Error("Resource NOT FOUND!......");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});
app.listen(process.env.PORT || 3001);
