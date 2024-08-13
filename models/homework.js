const mongoose = require("mongoose");
mongoose.pluralize(null);

const answerSchema = new mongoose.Schema({
    question:{ type: String, required: true },
    options: [String],
    answer: { type: String, required: true },
});

const manageHomework = new mongoose.Schema({
    title:{ type: String, required: true },
    
    description:{type: String, required: true},
    createdTId: { type: String, required: true },
    assignedStudents:[{sId:String,sName:String}],
    questions: [answerSchema],
});

module.exports = mongoose.model("homeworks", manageHomework);
