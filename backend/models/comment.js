const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: true,
  },
  user: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // each comment can only relates to one blog, so it's not in array
  actualite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Actualite",
  },
});

module.exports = mongoose.model("Comment", commentSchema);
