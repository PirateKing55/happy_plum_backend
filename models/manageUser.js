const mongoose = require("mongoose");
mongoose.pluralize(null);

const manageUser = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  type: {
    type: String,
    enum: ["Student", "Teacher", "Parent"],
    required: true,
  },
  studentID: {
    type: String,
    unique: true,
    sparse: true,  // Allows this field to be optional (only for students)
  },
});

// Pre-save middleware to generate sequential studentID for students
manageUser.pre('save', async function (next) {
  if ((this.type === 'Student' || this.type === 'Parent') && !this.studentID) {
    try {
      // Find the last student user by studentID
      const lastStudent = await this.constructor.findOne({ studentID: { $regex: /^HP\d+/ } }).sort({ studentID: -1 });

      if (lastStudent && lastStudent.studentID) {
        // Extract the numeric part and increment it
        const lastID = parseInt(lastStudent.studentID.replace('HP', ''), 10);
        this.studentID = 'HP' + (lastID + 1);
      } else {
        // If no student exists, start with HP1
        this.studentID = 'HP1';
      }
    } catch (error) {
      return next(error);
    }
  }

  next();
});

module.exports = mongoose.model("manageUser", manageUser);
