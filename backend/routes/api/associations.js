const express = require("express");
const router = express.Router();
const {  authenAdmin,authDonneur } = require("../../utilis/auth");
const Association = require("../../models/respAssoc");

router.get("/", (req, res) => {
  // use '/' and not '/api/items/
  Association.find().then((associations) => res.json(associations));
});




//get facture by num
router.get("/:id", (req, res) => {
  Association.findOne({ _id: req.params.id }).then((assoc) =>
    res.json(assoc)
  );
});


//update assoc

router.put("/:id",authenAdmin, (req, res) => {
  Association.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        nom: req.body.nom,
        username: req.body.username,
        siege: req.body.siege,
        email: req.body.email,
        telephone: req.body.telephone,
        domaineActivite: req.body.domaineActivite,
        
       
      },
    }
  )
    .then((assoc) => {
      res.json(assoc);
      console.log("updated");
    })
    .catch((err) => {
      res.json(err);
      console.log("noo");
    });
});

// @route   DELETE api/items/:id
// @desc    Delete Item
// @access  Public
router.delete("/:id", authenAdmin,function (req, res, next) {
  Association.remove({ _id: req.params.id }, function (err, assoc) {
    console.log("Deleting association " + req.params.id);
    res.json(assoc);
  });
});







module.exports = router;
