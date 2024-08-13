const mongoose = require("mongoose");
mongoose.pluralize(null);

const answerSchema = new mongoose.Schema({
    question_id: { type: String, required: true },
    question_name: { type: String, required: true },
    user_answer: { type: String, required: true },
    correct_answer: { type: String},
    is_correct: { type: Boolean, required: true },
});

const manageTestAssessment = new mongoose.Schema({
    student_id: { type: String, required: true },
    name: { type: String, required: true },
    percentage:{ type: String, required: true },
    review:String,
    answer: [answerSchema],
}, {
    timestamps: true,
});

module.exports = mongoose.model("test-assessment", manageTestAssessment);
