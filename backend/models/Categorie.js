const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorieSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
module.exports = Categorie = mongoose.model("Categorie", CategorieSchema);
