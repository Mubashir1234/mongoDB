const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  //post: { type: mongoose.SchemaTypes.ObjectId, ref: "post" },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
