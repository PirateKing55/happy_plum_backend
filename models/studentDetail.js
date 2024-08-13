const mongoose = require("mongoose");
mongoose.pluralize(null);

const homeworkSchema = new mongoose.Schema({
  homeworkId: String,
  percentage: String,
  grade: String,
  status: String,
  feedback: String,
  answers: [{ questionId: String, user_Answer: String, correct_Answer: String, isCorrect: Boolean }]
});

const manageStudentDetail = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  sId: { type: mongoose.Schema.Types.ObjectId, ref: 'manageUser' },
  homework: { type: [homeworkSchema], default: null },
  studentID: {
    type: String,
    ref: 'manageUser',
    required: true,
  },
});


// Pre-save middleware to ensure studentID is populated from manageUser
manageStudentDetail.pre('save', async function (next) {
  if (!this.studentID) {
    try {
      const user = await mongoose.model('manageUser').findById(this.sId);
      if (user && (user.type === 'Student' || user.type === 'Parent')) {
        this.studentID = user.studentID;
      } else {
        return next(new Error('Only students can have a studentID'));
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("student_detail", manageStudentDetail);
