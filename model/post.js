const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postName: { type: String },
  arthur: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  postComment: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Comment" }],
  createdAt: { type: Date, default: new Date().toDateString() },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
