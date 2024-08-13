var manageReviewsheet = require("../models/reviewSheet");

const reviewSheetSubmit = async (req, res) => {
    console.log("review",req.body)
  try {
    const { student_id } = req.body;

    // Check if the homework already exists for this student_id
    const existingReviewsheet = await manageReviewsheet.findOne({ student_id });

    if (existingReviewsheet) {
      // If homework already exists for this student, send a specific message
      return res.send({ message: ' Already Review-Sheet submitted' });
    }

    // If homework does not exist, proceed to save it
    const newReviewsheet = new manageReviewsheet(req.body);
    await newReviewsheet.save();
    
    // Example response for successful submission
    res.send({ message: 'Review-Sheet submitted successfully.' });
  } catch (error) {
    console.error('Error submitting homework:', error);
    res.send({ error: 'Server error. Please try again.' });
  }
};

   

module.exports = {reviewSheetSubmit};

