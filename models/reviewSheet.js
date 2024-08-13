const mongoose = require("mongoose");
mongoose.pluralize(null);

const reviewSchema = new mongoose.Schema({
    reviewId: { type: String, required: true },
    reviewName: { type: String, required: true },
    isCheck: { type: Boolean, required: true }
    
});

const manageReviewSheet = new mongoose.Schema({
    student_id: { type: String, required: true },
    name:{ type: String, required: true },
    review:[reviewSchema]
}, {
    timestamps: true,
});

module.exports = mongoose.model("reviewsheet", manageReviewSheet);
