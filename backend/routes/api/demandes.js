const {  authenAdmin } = require("../../utilis/auth");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Demande = require("../../models/demandeDon");

// First thing: module.exports = router;

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get("/", (req, res) => {
  // use '/' and not '/api/items/
  Demande.find().then((demandes) => res.json(demandes));
});

// @route   POST api/items
// @desc    Add New Item
// @access  Public
router.post("/", (req, res) => {
  const newDemande = new Demande({
    
    assoc: req.body.assoc,
    date_pub: req.body.date_pub,
    etat: req.body.etat,
    besoins: req.body.besoins,
    description:req.body.description,
    ref:req.body.ref,
    
  });
  newDemande
    .save()
    .then((categ) => res.json({ success: true, categ }))
    .catch((err) => res.json("Save error: " + err));
});

// @route   DELETE api/items/:id
// @desc    Delete Item
// @access  Public
router.delete("/:id", function (req, res, next) {
  Demande.remove({ _id: req.params.id }, function (err, categ) {
    console.log("Deleting demande " + req.params.id);
    res.json(categ);
  });
});


//update cout

router.put("/:id",(req, res) => {
  Demande.updateOne(
    {
      _id: req.params.id,
    },
    { $push: { besoins: req.body.besoins } },
    
    {
      $set: {
        ref:req.body.ref,
        etat: req.body.etat,
       
      },   
    }
  )
    .then((art) => {
      res.json(art);
      console.log(art);
    })
    .catch((err) => {
      res.json(err);
      console.log("noo"+err);
    });
});

//update elemnets quantite in besoins array

router.put("/:id/update_besoins/:idBesoin",(req, res) => {
  Demande.updateOne(
    {
      _id: req.params.id,
      "besoins._id": req.params.idBesoin
    },
   
    
    { $set: { 
      "besoins.$.quantite_restante": req.body.quantite_final

    
    
    } }
  )
    .then((art) => {
      res.json(art);
      console.log(art);
    })
    .catch((err) => {
      res.json(err);
      console.log("noo "+err);
      
    });
});






router.put("/:id/update_etat",(req, res) => {
  Demande.updateOne(
    {
      _id: req.params.id,
    },
   
    
    {
      $set: {
        
        etat: req.body.etat,
       
      },   
    }
  )
    .then((art) => {
      res.json(art);
      console.log(art);
    })
    .catch((err) => {
      res.json(err);
      console.log("noo"+err);
    });
});


router.get("/:assoc", (req, res) => {
  // use '/' and not '/api/items/
  Demande.find({ assoc: req.params.assoc }).then((demandes) => res.json(demandes));
});

router.get("/getAll/:etat", (req, res) => {
  // use '/' and not '/api/items/
  Demande.find({ etat: req.params.etat }).then((demandes) => res.json(demandes));
});



module.exports = router;
