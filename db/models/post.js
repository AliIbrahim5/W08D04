const mongoose = require("mongoose");

const post = new mongoose.Schema({
  img: { type: String },
  desc: { type: String, required: true  },
  time: {type: Date},
  isDelet: { type: Boolean, default: false },
  isLik: { type: mongoose.Schema.Types.ObjectId, ref: "Like" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
},
{timestamps: true}
);

module.exports = mongoose.model("Post", post);
