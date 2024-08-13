var manageHomework = require("../models/homework");
var manageStudentDetail = require("../models/studentDetail");

const getAssignedHomework = async (req, res) => {
  console.log("req.params", req.params.id);
  try {
    const id = req.params.id; // Assuming _id is passed as a route parameter

    // Find all homework submissions associated with the given _id
    const homeworkSubmissions = await manageHomework.find({ "assignedStudents.sId": id });

    if (homeworkSubmissions.length === 0) {
      // If no homework submissions found for this _id, send a specific message
      return res.send({ message: 'No homework submissions found for this ID.' });
    }

    // If homework submissions exist, send them as a response
    res.send(homeworkSubmissions);
  } catch (error) {
    console.error('Error retrieving homework submissions:', error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};


// const submitAssignedHomework = async (req, res) => {
//   console.log("review", req.body);
//   try {
//     const { id } = req.params;
//     const { homeworkId, answers } = req.body;

//     // Check if the student exists
//     const student = await manageStudentDetail.findOne({ sId: id });

//     if (!student) {
//       return res.send({ message: 'Student not found.' });
//     }

//     // Check if the homework already exists
//     const existingHomework = student.homework.find(hw => hw.homeworkId === homeworkId);

//     if (existingHomework) {
//       // Homework already exists, respond with a message
//       return res.send({ message: 'Homework already submitted.' });
//     }
    
//     const result = await manageHomework.findOne({question_id,answer},{ _id: homeworkId });
    
//     // Add new homework entry
//     student.homework.push({ homeworkId, answers });

//     // Save the updated student document
//     await student.save();

//     res.send({ message: 'Homework submitted successfully.' });
//   } catch (error) {
//     console.error('Error submitting homework:', error);
//     res.status(500).send({ error: 'Server error. Please try again.' });
//   }
// };

const submitAssignedHomework = async (req, res) => {
  console.log("review", req.body);
  try {
    const { id } = req.params;
    const { homeworkId, answers } = req.body;

    // Check if the student exists
    const student = await manageStudentDetail.findOne({ sId: id });

    if (!student) {
      return res.send({ message: 'Student not found.' });
    }

    // Check if the homework already exists
    const existingHomework = student.homework.find(hw => hw.homeworkId === homeworkId);

    if (existingHomework) {
      // Homework already exists, respond with a message
      return res.send({ message: 'Homework already submitted.' });
    }

    // Fetch the homework entry with questions
    const homework = await manageHomework.findOne({ _id: homeworkId });

    if (!homework) {
      return res.send({ message: 'Homework not found.' });
    }

    // Create a map of questionId to correct answers
    const questionIdToAnswerMap = homework.questions.reduce((map, question) => {
      map[question._id] = question.answer;
      return map;
    }, {});

    // Compare student's answers with correct answers and calculate results
    let correctCount = 0;
    const results = answers.map(({ questionId, user_Answer }) => {
      const correctAnswer = questionIdToAnswerMap[questionId];
      const isCorrect = correctAnswer === user_Answer;
      if (isCorrect) correctCount++;
      return { questionId, user_Answer, isCorrect, correct_Answer: correctAnswer };
    });

    // Calculate percentage and grade
    const totalQuestions = homework.questions.length;
    const percentage = (correctCount / totalQuestions) * 100;
    let grade;

    if (percentage >= 90) grade = 'A';
    else if (percentage >= 80) grade = 'B';
    else if (percentage >= 70) grade = 'C';
    else if (percentage >= 60) grade = 'D';
    else grade = 'F';

    // Add new homework entry with results
    student.homework.push({ homeworkId, answers: results, percentage, grade ,status:"submitted"});

    // Save the updated student document
    await student.save();

    res.send({ message: 'Homework submitted successfully.' });
  } catch (error) {
    console.error('Error submitting homework:', error);
    res.status(500).send({ error: 'Server error. Please try again.' });
  }
};


const getResultHomework = async (req, res) => {
  console.log("req.params", req.params.id);
  try {
    const id = req.params.id; // Assuming _id is passed as a route parameter

    // Find all homework submissions associated with the given _id
    const homeworkResults = await manageStudentDetail.find({ sId: id });

    if (homeworkResults.length === 0) {
      // If no homework submissions found for this _id, send a specific message
      return res.send({ message: 'No  found for this ID.' });
    }

    // If homework submissions exist, send them as a response
    res.send(homeworkResults);
    // console.log("homeworkResults",homeworkResults);
  } catch (error) {
    console.error('Error retrieving homework submissions:', error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};



    

module.exports = {getAssignedHomework,submitAssignedHomework,getResultHomework};

