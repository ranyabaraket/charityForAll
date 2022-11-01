const express = require("express");
const router = express.Router();
const {  authen } = require("../../utilis/auth");
const Actualite = require("../../models/actualite");

router.get("/", (req, res) => {
  // use '/' and not '/api/items/
  Actualite.find().then((actualites) => res.json(actualites));
});

router.post("/",(req, res) => {
  const newActualite = new Actualite({
    
    nom: req.body.nom,
    designation: req.body.designation,
   
    image: req.body.image,
  });
  newActualite
    .save()
    .then((actualite) => res.json({ success: true, actualite }))
    .catch((err) => res.json("Save error: " + err));
});


router.delete("/:id", function (req, res, next) {
  Actualite.remove({ _id: req.params.id }, function (err, categ) {
    console.log("Deleting actualite " + req.params.id);
    res.json(categ);
  });
});



router.put("/:id",(req, res) => {
  Actualite.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        
        designation: req.body.description,
        nom: req.body.nom,
        image:req.body.image
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
