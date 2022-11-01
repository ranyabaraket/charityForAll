// Imports
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport=require("passport")

// Lunch Express
const app = express();
app.use(express.json({limit: '50mb'}));
// Body Parser Middlleware for API
app.use(express.json());

//cors middlleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//passport middlleware

// 1- Add DB config
const db = require("./config/key").mongoURI;



// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("MongoDB error: " + err));

// 2- Add Routes API ./routes/api
// Items route API Midleware


const users = require("./routes/api/users");
const associations = require("./routes/api/associations");

const categories = require("./routes/api/categories");
const actualites = require("./routes/api/actualites");
const admins = require("./routes/api/admins");
//passport middleware


app.use(passport.initialize())
require("./middlewares/passport")(passport);
app.use("/api/users", users);
app.use("/api/actualites", actualites);
app.use("/api/associations", associations);


app.use("/api/admins", admins);
app.use("/api/categories", categories);



// Port for production
const port = process.env.PORT || 5000;

// Lunch server
app.listen(port, () => console.log(`Server running on port ${port}...`));
