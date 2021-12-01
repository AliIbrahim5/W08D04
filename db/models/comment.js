const mongoose = require("mongoose");


const comment = new mongoose.Schema({
  comment: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},
{timestamps: true}
);


module.exports = mongoose.model("Comment", comment);
