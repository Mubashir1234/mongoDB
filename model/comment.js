const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: { type: String },
  commentator: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  postCommented: { type: mongoose.SchemaTypes.ObjectId, ref: "Post" },
  createdAt: { type: Date, default: new Date().toDateString() },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
