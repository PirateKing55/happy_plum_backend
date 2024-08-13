const mongoose = require("mongoose");
mongoose.pluralize(null);

const manageAssignment = new mongoose.Schema({
    createdTId:{type: String, required: true},
    name:{type: String, required: true},
    description:{type: String, required: true},
    dueDate:{type: String, required: true},
    assignedStudents:[{sId:String,sName:String}]
});
module.exports = mongoose.model("assignment", manageAssignment);
