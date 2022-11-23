const express = require("express");
const router = express.Router();
const { authen } = require("../../utilis/auth");
const Actualite = require("../../models/actualite");
const Comment = require("../../models/comment");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  // use '/' and not '/api/items/
  Actualite.find().then((actualites) => res.json(actualites));
});

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
  Actualite.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        designation: req.body.description,
        nom: req.body.nom,
        image: req.body.image,
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

router.post("/:id/comment", async (req, res) => {
  // find out which post you are commenting
  const id = req.params.id;
  // get the comment text and record post id
  const comment = new Comment({
    text: req.body.comment,
    actualite: id,
    user: req.body.user,
  });
  // save comment
  await comment.save();
  // get this particular post
  const actualite = await Actualite.findById(id);
  // push the comment into the post.comments array
  actualite.comments.push(comment);
  // save and redirect...
  await actualite
    .save()
    .then((actualite) => res.json({ success: true, comment }))
    .catch((err) => res.json("Save error: " + err));
});

router.get("/comment/:commentId", (req, res) => {
  const commentId = req.params.commentId;
  Comment.findById(commentId).then((comment) => res.json(comment));
});

router.put("/comment/:id", async (req, res) => {
  console.log(req.body.text);
  Comment.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        text: req.body.text,
      },
    }
  )
    .then((comment) => {
      res.json(comment);
      console.log("updated");
    })
    .catch((err) => {
      res.json(err);
      console.log("noo");
    });
});

router.delete("/comment/:id", function (req, res, next) {
  Actualite.update(
    {},
    { $pull: { comments: req.params.id } },
    { multi: true },
    next
  )
    .then((comment) => res.json({ success: true, comment }))
    .catch((err) => res.json("Delete error: " + err));
});

module.exports = router;
