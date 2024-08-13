const mongoose = require("mongoose");
mongoose.pluralize(null);

const manageProgressReport = new mongoose.Schema({
    studentId: { type: String, required: true },
    studentName:{ type: String, required: true },
    createdTId: { type: String, required: true },
      strengths:[{ type: String, required: true }],
      areasForImprovement:[{ type: String, required: true }],
      overallProgress:{ type: String, required: true }
});
module.exports = mongoose.model("progress-report", manageProgressReport);
