const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const customName =
      new Date().getTime() + "-" + file.fieldname + "-" + file.originalname;
    cb(null, customName);
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
});
const router = express.Router();
const {
  getAllPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post");
router.get("/", getAllPost);
router.get("/:id", getPost);
router.post("/", upload.single("file"), createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
module.exports = router;
