const mongoose = require("mongoose");
mongoose.pluralize(null);

const popUpForm = new mongoose.Schema({
  name:String,
  phonenumber:String,
  email: String,
});
module.exports = mongoose.model("popUpForm ", popUpForm );
