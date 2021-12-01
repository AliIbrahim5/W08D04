const mongoose = require("mongoose");

const post = new mongoose.Schema({
  img: { type: String },
  desc: { type: String, require: true },
  time: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  isDel: { type: Boolean, default: false },
});

module.exports = mongoose.model("Post", post);
