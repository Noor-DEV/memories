const PostModel = require("../models/post");
const base_url = process.env.PORT;
const getAllPost = (req, res, next) => {
  PostModel.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error in retrieving all posts", error: err });
    });
};
const getPost = (req, res, next) => {
  const { id } = req.params;
  PostModel.findById(id)
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status.json({
        message: "Post not found",
        error: err,
      });
    });
};
const createPost = (req, res, next) => {
  const { path } = req.file;
  //likes & tags are not a must......
  const { title, name, message, file, likes, tags } = req.body;
  const formattedTags = tags.split(",");
  const newPost = new PostModel({
    title,
    name,
    message,
    file,
    likes,
    tags: formattedTags,
    file: `${base_url}/${path}`,
  });
  newPost
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("Error occured when saving new post");
      res.status(500).json({
        message: "Error occured when saving new post",
        error: err,
      });
    });
};
const updatePost = (req, res, next) => {
  const { id } = req.params;
  const toUpdate = {};

  for (x in req.body) {
    if (req.body[x]) {
      toUpdate[x] = req.body[x];
    }
  }
  PostModel.findByIdAndUpdate(id, toUpdate, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
const deletePost = (req, res, next) => {
  const { id } = req.params;
  PostModel.findByIdAndDelete(id)
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error in deleting post",
        error: err,
      });
    });
};

module.exports = {
  getAllPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
