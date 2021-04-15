const getAllPost = (req, res, next) => {
  res.status(200).json({ status: "Get All Posts working" });
};
const getPost = (req, res, next) => {
  res.status(200).json({ status: "Get Post working" });
};
const createPost = (req, res, next) => {
  console.log(req.body, "...........REQ-BODY..................");
  console.log(req.file, ".............FILE....................");

  res.status(200).json({ status: "create Post working" });
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
