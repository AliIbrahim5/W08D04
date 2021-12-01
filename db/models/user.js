
const mongoose = require("mongoose");

const user = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  img: { type: String },
  isDelet: { type: Boolean, default: false },
  role: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
});


module.exports = mongoose.model("User", user);