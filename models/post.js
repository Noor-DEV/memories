const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  message: { type: String, required: true },
  file: { type: String, required: true },
  likes: { type: Number, default: 0 },
  tags: { type: Array, required: false },
});
module.exports = model("Memzz", postSchema);
