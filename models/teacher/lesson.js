const mongoose = require("mongoose");
mongoose.pluralize(null);

const manageLesson= new mongoose.Schema({
    createdTId:{type: String, required: true},
    title:{type: String, required: true},
    description:{type: String, required: true}
});
module.exports = mongoose.model("lesson", manageLesson);
