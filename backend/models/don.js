const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DonSchema = new Schema({
  donneur: {
    type: String,
    required: true,
  },
  refDemande: {
    type: String,
    required: true,
  },
  id_demande: {
    type: String,
    required: true,
  },
  etat: {
    type: String,
    required: true,
  },
  besoins : [{
    description : String,
    quantite_initial : Number,
    quantite_donee : Number,
    quantite_restante : Number,
    categorie:String,

    
    
     }]

});
module.exports = Don = mongoose.model("Don", DonSchema);
