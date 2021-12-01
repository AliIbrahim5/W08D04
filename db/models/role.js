
const mongoose = require("mongoose");


const role = new mongoose.Schema({
  role: { type: String },
  permossion: { type: Array },
});

module.exports = mongoose.model("Role", role);