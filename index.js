var express = require("express");
var path = require("path");
var app = express();
var mongoose = require("mongoose");
var User = require("./model/user");
var Post = require("./model/post");
var Comment = require("./model/comment");

app.listen(3000, () => {
  console.log("app is listing on 3000");
});

app.get("/", (req, res) => {
  res.send("app is running");
});

app.get("/user", async (req, res) => {
  const user = await User.create({ name: "max" });
  res.send(user);
});

app.get("/post", async (req, res) => {
  const params = {
    postName: "Instapost",
    arthur: "652dfed04a9879213afa292f",
  };
  const post = await Post.create(params);
  res.send(post);
});

app.get("/comments", async (req, res) => {
  const params = {
    comment: "this comment is for insta post from kim ",
    commentator: "652dfed04a9879213afa292f",
    postCommented: "652e000541900ddcf696291e",
  };
  const comment = await Comment.create(params);
  console.log(comment._id);
  const comment_id = comment._id;
  const postId = comment.postCommented;

  const filter = { _id: postId };
  const update = {
    $push: { postComment: comment_id },
  };

  const saveComment = await Post.updateOne(filter, update);
  console.log(saveComment);
  res.send(comment);
});

app.get("/getpostcomments/:id", async (req, res) => {
  const id = req.params.id;

  const commentDetails = await Comment.findOne({ _id: id })
    .populate({
      path: "commentator",
    })
    .populate({ path: "postCommented", populate: "postComment" });
  res.send(commentDetails);
});

app.get("/getpostdetail/:id", async (req, res) => {
  const id = req.params.id;

  const postDetails = await Post.find({ _id: id }).populate("arthur");
  res.send(postDetails);
});

const uri = "mongodb://localhost:27017/populate-database";
mongoose.set("strictQuery", false);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("MongoDB Connected"))
  .catch((error) => console.log(error.message));
