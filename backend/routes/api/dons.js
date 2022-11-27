const {  authenAdmin } = require("../../utilis/auth");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Don = require("../../models/don");

// First thing: module.exports = router;

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get("/", (req, res) => {
  // use '/' and not '/api/items/
  Don.find().then((dons) => res.json(dons));
});

// @route   POST api/items
// @desc    Add New Item
// @access  Public
router.post("/", (req, res) => {
  const newDon = new Don({
    
    donneur: req.body.donneur,
    refDemande: req.body.refDemande,
    id_demande: req.body.id_demande,
    besoins: req.body.besoins,
    etat:req.body.etat,
    
    
  });
  newDon
    .save()
    .then((categ) => res.json({ success: true, categ }))
    .catch((err) => res.json("Save error: " + err));
});



module.exports = router;
