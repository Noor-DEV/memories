const PostModel = require("../models/post");
const base_url = "https://localhost:3001/";
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
  res.status(200).json({ status: "Get Post working" });
};
const createPost = (req, res, next) => {
  const { path } = req.file;
  //likes & tags are not a must......
  const { title, name, message, file, likes, tags } = req.body;
  const formattedTags = tags.split(",");
  console.log(req.body, "...........REQ-BODY..................");
  console.log(req.file, ".............FILE....................");
  console.log(formattedTags, "..........formattedTags...........");

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
      res.status(200).json({
        message: "success in saving new post",
        createdPost: result,
      });
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
  res.status(200).json({ status: "update Post working" });
};
const deletePost = (req, res, next) => {
  res.status(200).json({ status: "delete Post working" });
};

module.exports = {
  getAllPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
