const mongoose = require("mongoose");
mongoose.pluralize(null);

const manageProject = new mongoose.Schema({
  studentId: String,
  projectDoc: Object,
});
module.exports = mongoose.model("Project", manageProject);
