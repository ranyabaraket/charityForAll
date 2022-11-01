const {  authenAdmin } = require("../../utilis/auth");
const express = require("express");
const router = express.Router();


const Categorie = require("../../models/Categorie");

// First thing: module.exports = router;

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get("/",authenAdmin, (req, res) => {
  // use '/' and not '/api/items/
  Categorie.find().then((categories) => res.json(categories));
});

// @route   POST api/items
// @desc    Add New Item
// @access  Public
router.post("/",authenAdmin, (req, res) => {
  const newCateg = new Categorie({
    
    description: req.body.description,
    nom: req.body.nom,
    
  });
  newCateg
    .save()
    .then((categ) => res.json({ success: true, categ }))
    .catch((err) => res.json("Save error: " + err));
});

// @route   DELETE api/items/:id
// @desc    Delete Item
// @access  Public
router.delete("/:id",authenAdmin, function (req, res, next) {
  Categorie.remove({ _id: req.params.id }, function (err, categ) {
    console.log("Deleting categorie " + req.params.id);
    res.json(categ);
  });
});


//update cout

router.put("/:id", authenAdmin,(req, res) => {
  Categorie.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        
        description: req.body.description,
        nom: req.body.nom,
        
      },
    }
  )
    .then((art) => {
      res.json(art);
      console.log("updated");
    })
    .catch((err) => {
      res.json(err);
      console.log("noo");
    });
});

module.exports = router;
