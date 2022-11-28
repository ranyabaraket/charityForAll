const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DemandeSchema = new Schema({
  ref: {
    type: String,
    required: false,
  },
  assoc: {
    type: String,
    required: false,
  },
  date_pub: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  etat: {
    type: String,
    required: false,
    enum: ["Pending","Accepted","Refused"],
  },
  besoins : [{
    description : String,
    quantite_initial : Number,
    quantite_restante : Number,
    categorie:String
     }]
});
module.exports = Demande = mongoose.model("Demande", DemandeSchema);
