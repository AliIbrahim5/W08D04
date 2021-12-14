const mongoose = require("mongoose");
// سكيما البوست ومرتبط مع اليوزر والكومنت
const post = new mongoose.Schema({
  img: { type: String },
  desc: { type: String, require: true },
  time: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  isDel: { type: Boolean, default: false },
},{
  timestamps:true,
});

module.exports = mongoose.model("Post", post);
