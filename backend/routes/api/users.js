const router = require("express").Router();

const { userRegister, userLogin, authenAdmin,respRegister,respLogin } = require("../../utilis/auth");
const User = require("../../models/user");

// Users Registeration Route
router.post("/register-user",async (req, res) => {
  await userRegister(req.body, "user", res);
});


// donneur Registeration Route
router.post("/register-donneur",async (req, res) => {
  await userRegister(req.body, "donneur", res);
});


// respAssoc Registeration Route
router.post("/register-resp",async (req, res) => {
  await respRegister(req.body, "RespAssoc", res);
});


// Admin Registration Route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});
// Users Login Route
router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});


// donneur Login Route
router.post("/login-donneur", async (req, res) => {
  await userLogin(req.body, "donneur", res);
});


// RespAssoc Login Route
router.post("/login-respAssoc", async (req, res) => {
  await respLogin(req.body, "RespAssoc", res);
});


// Admin Login Route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});


// Profile Route
router.get("/profile", authenAdmin, (req, res) => {
  User.findById(req.userid)
    .select("-password")
    .then((user) => res.json(user));
});


//nzidou methode get all users
router.get("/", (req, res) => {
  // use '/' and not '/api/items/
  User.find().then((users) => res.json(users));
});

//update donneur
router.put("/donneur/:id",authenAdmin, (req, res) => {
  User.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        nom: req.body.nom,
        prenom: req.body.prenom,
        username: req.body.username,
        email: req.body.email,
        telephone: req.body.telephone,
        addresse: req.body.addresse
        
       
      },
    }
  )
    .then((user) => {
      res.json(user);
      console.log("updated");
    })
    .catch((err) => {
      res.json(err);
      console.log("noo");
    });
});

//delete donor
// @route   DELETE api/items/:id
// @desc    Delete Item
// @access  Public
router.delete("/donneur/:id", /*authenAdmin,*/function (req, res, next) {
  User.remove({ _id: req.params.id }, function (err, user) {
    console.log("Deleting donor " + req.params.id);
    res.json(user);
  });
});


module.exports = router;
