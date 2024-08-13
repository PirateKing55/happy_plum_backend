const mongoose = require("mongoose");
mongoose.pluralize(null);

const matchSchema = new mongoose.Schema({
    id: String,
    phrase: String,
    englishOptions: [String],
    correct_Answer: String
  });
  
  const questionSchema = new mongoose.Schema({
    id: String,
    type: String,
    question: String,
    options: [String],
    name: String,
    correct_Answer: String,
    matches: [matchSchema]
  });

module.exports = mongoose.model('Question', questionSchema);
