require("dotenv").config();
module.exports = {
  mongoURI: "mongodb://localhost:27017/charityForAll",
  SECRET: process.env.APP_SECRET,
};
