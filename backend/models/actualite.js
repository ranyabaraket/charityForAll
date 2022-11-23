const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActualiteSchema = new Schema({
  nom: {
    type: String,
  },

  designation: {
    type: String,
  },

  image: {
    type: String,
    required: false,
  },

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],

  // commentaire: {
  //   type: String,
  //   required: false,
  // }
});
module.exports = Actualite = mongoose.model("Actualite", ActualiteSchema);
