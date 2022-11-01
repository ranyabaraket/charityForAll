const express = require("express");
const router = express.Router();

// Add Mongoose Schema ./models/client
// Client Model
const Admin = require("../../models/admin");
const bcrypt = require("bcrypt");
// First thing: module.exports = router;

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get("/", (req, res) => {
  // use '/' and not '/api/items/
  Admin.find().then((admins) => res.json(admins));
});

// @route   POST api/items
// @desc    Add New Item
// @access  Public
router.post("/create", (req, res) => {
  const newAdmin = new Admin({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  newAdmin
    .save()
    .then((admin) => res.json({ success: true, admin }))
    .catch((err) => res.json("Save error: " + err));
  const newUser = new User({
    username: newAdmin.username,
    password: newAdmin.password,
    role: "admin",
  });
  newUser
    .save()
    .then((user) => res.json({ success: true, user }))
    .catch((err) => {
      res.json("save errue user" + err);
    });
});

// @route   DELETE api/items/:id
// @desc    Delete Item
// @access  Public
router.delete("/:id", function (req, res, next) {
  Admin.remove({ _id: req.params.id }, function (err, cout) {
    console.log("Deleting cout " + req.params.id);
    res.json(admin);
  });
});

module.exports = router;
