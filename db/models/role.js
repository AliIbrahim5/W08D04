
const mongoose = require("mongoose");

// سكيما الرول 
const role = new mongoose.Schema({
  role: { type: String },
  permossion: { type: Array },
});

module.exports = mongoose.model("Role", role);