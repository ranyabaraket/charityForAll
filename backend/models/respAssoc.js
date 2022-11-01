const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const RespSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  nom: {
    type: String,
  },
  domaineActivite: {
    type: String,
  },

  email: { type: String, required: true },
  siege: { type: String },

  telephone: { type: Number },
  role: {
    type: String,
    enum: ["user", "admin", "donneur", "RespAssoc"],
    required: true,
  },

  
});



module.exports = Resp = mongoose.model("Resp", RespSchema);