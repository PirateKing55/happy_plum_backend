var manageProgressReport = require("../../models/teacher/progressReport");
var manageUser = require("../../models/manageUser");
const createProgressReport = async (req, res) => {
    console.log("review",req.body)
  try {
    const { studentName } = req.body;

    // Check if the homework already exists for this student_id
    const existingProgressReport = await manageProgressReport.findOne({studentName});

    if (existingProgressReport) {
      // If homework already exists for this student, send a specific message
      return res.send({ message: ' Already Prograss-Report submitted' });
    }

    // If homework does not exist, proceed to save it
    const newProgressReport = new manageProgressReport(req.body);
    await newProgressReport.save();
    
    // Example response for successful submission
    res.send({ message: 'Progress-Report submitted successfully.' });
  } catch (error) {
    console.error('Error submitting Progress-Report:', error);
    res.send({ error: 'Server error. Please try again.' });
  }
};

const getProgressReport = async (req, res) => {
  console.log("req.params",req.params.id)
  try {
    const id = req.params.id; // Assuming _id is passed as a route parameter

    // Find all test submissions associated with the given _id
    const progressReportSubmissions = await manageProgressReport.find({ createdTId: id });

    if (progressReportSubmissions.length === 0) {
      // If no test submissions found for this _id, send a specific message
      return res.send({ message: 'No Progress-Report submissions found for this ID.' });
    }

    // If homework submissions exist, send them as a response
    res.send(progressReportSubmissions);
  } catch (error) {
    console.error('Error retrieving Progress-Report submissions:', error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

const getAllStudent = async (req, res) => {
  console.log("req.params",req.params.id)
  try {
    const id = req.params.id; // Assuming _id is passed as a route parameter

    // Find all test submissions associated with the given _id
    const studentSubmissions = await manageUser.find({type:"Student"});

    if (studentSubmissions.length === 0) {
      // If no test submissions found for this _id, send a specific message
      return res.send({ message: 'No studentSubmissions submissions found for this ID.' });
    }

    // If homework submissions exist, send them as a response
    res.send(studentSubmissions);
  } catch (error) {
    console.error('Error retrieving Progress-Report submissions:', error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};


   

module.exports = {createProgressReport,getProgressReport,getAllStudent};

