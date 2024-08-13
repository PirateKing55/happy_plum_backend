var manageTestAssessment = require("../models/testAssessment");

// const submitTestAssessment = async (req, res) => {
//     console.log("review",req.body)
//   try {
//     const { student_id,answer } = req.body;

//     // Check if the homework already exists for this student_id
//     const existingTestAssessment = await manageTestAssessment.findOne({ student_id });

//     if (existingTestAssessment) {
//       // If homework already exists for this student, send a specific message
//       return res.send({ message: ' Already Test-Assessment submitted' });
//     }

//     console.log("answer",answer.is_correct)
//     // If homework does not exist, proceed to save it
//     const newTestAssessment = new manageTestAssessment({...req.body,percentage:"95%"});
//     await newTestAssessment.save();
    
//     // Example response for successful submission
//     res.send({ message: 'Test-Assessment submitted successfully.' });
//   } catch (error) {
//     console.error('Error submitting homework:', error);
//     res.send({ error: 'Server error. Please try again.' });
//   }
// };


const submitTestAssessment = async (req, res) => {
  console.log("review", req.body);
  try {
    const { student_id, answer } = req.body;

    // Check if the homework already exists for this student_id
    const existingTestAssessment = await manageTestAssessment.findOne({ student_id });

    if (existingTestAssessment) {
      // If homework already exists for this student, send a specific message
      return res.send({ message: 'Already Test-Assessment submitted' });
    }

    // Count the number of correct and incorrect answers
    let correctCount = 0;
    let incorrectCount = 0;

    answer.forEach(answer => {
      if (answer.is_correct) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    // Calculate the percentage of correct answers
    const totalAnswers = correctCount + incorrectCount;
    const percentage = totalAnswers === 0 ? 0 : (correctCount / totalAnswers) * 100;

    // If homework does not exist, proceed to save it
    const newTestAssessment = new manageTestAssessment({ ...req.body, percentage: `${percentage.toFixed(2)}%` });
    await newTestAssessment.save();

    // Example response for successful submission
    res.send({ message: 'Test-Assessment submitted successfully.' });
  } catch (error) {
    console.error('Error submitting homework:', error);
    res.send({ error: 'Server error. Please try again.' });
  }
};



const getTestAssessment = async (req, res) => {
  console.log("req.params",req.params.id)
  try {
    const id = req.params.id; // Assuming _id is passed as a route parameter

    // Find all test submissions associated with the given _id
    const testAssessmentSubmissions = await manageTestAssessment.find({ student_id: id });

    if (testAssessmentSubmissions.length === 0) {
      // If no test submissions found for this _id, send a specific message
      return res.send({ message: 'No Test-Assessments submissions found for this ID.' });
    }

    // If homework submissions exist, send them as a response
    res.send(testAssessmentSubmissions);
  } catch (error) {
    console.error('Error retrieving Test-Assessment submissions:', error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};


   

module.exports = {submitTestAssessment,getTestAssessment};

