
var manageHomework = require("../../models/homework");
var manageStudentDetail = require("../../models/studentDetail");
const createHomework = async (req, res) => {
    console.log("review",req.body)
  try {
    const { title } = req.body;

    // Check if the homework already exists for this student_id
    const existingAssignment = await manageHomework.findOne({title});

    if (existingAssignment) {
      // If homework already exists for this student, send a specific message
      return res.send({ message: ' Already Homework title exist' });
    }

    // If homework does not exist, proceed to save it
    const newAssignment = new manageHomework(req.body);
    await newAssignment.save();
    
    // Example response for successful submission
    res.send({ message: 'Created Homework successfully.' });
  } catch (error) {
    console.error('Error creating Homework:', error);
    res.send({ error: 'Server error. Please try again.' });
  }
};

const getHomework = async (req, res) => {
  try {
    const id = req.params.id; // Assuming _id is passed as a route parameter

    // Find all test submissions associated with the given _id
    const assignmentSubmissions = await manageHomework.find({ 
      createdTId: id });

    if (assignmentSubmissions.length === 0) {
      // If no test submissions found for this _id, send a specific message
      return res.send({ message: 'No Homeworks submissions found for this ID.' });
    }

    // If homework submissions exist, send them as a response
    res.send(assignmentSubmissions);
  } catch (error) {
    console.error('Error retrieving Homework submissions:', error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

const updateAssignHomework = async (req, res) => {
  const { homeworkId, studentId, studentName } = req.body;

  try {
    let updatedJob = await manageHomework.findOneAndUpdate(
      { _id: homeworkId }, // Query condition based on the document's _id field
      {
        $addToSet: { // Using $addToSet to add a new element to the assignedStudents array if it does not exist already
          assignedStudents: { sId: studentId, sName: studentName }
        }
      },
      { new: true } // Option to return the updated document
    );

    if (!updatedJob) {
      return res.status(404).send({ error: "Job not found" });
    }

    res.send(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).send({ error: "Failed to update job" });
  }
};

const deleteAssignHomework = async (req, res) => {
  const { homeworkId, studentId } = req.body;

  try {
    let updatedJob = await manageHomework.findOneAndUpdate(
      { _id: homeworkId }, // Query condition based on the document's _id field
      { $pull: { assignedStudents: { sId: studentId } } }, // $pull to remove the matched element from assignedStudents array
      { new: true } // Option to return the updated document
    );

    if (!updatedJob) {
      return res.status(404).send({ error: "Job not found" });
    }

    res.send(updatedJob);
  } catch (error) {
    console.error("Error removing assigned student:", error);
    res.status(500).send({ error: "Failed to remove assigned student" });
  }
};

const getSubmittedHomework = async (req, res) => {
  console.log("Received request for ID:", req.params.id);
  try {
   // Assuming _id is passed as a route parameter

    // Find the student detail with all homework submissions associated with the given _id and status "submitted"
    const studentDetail = await manageStudentDetail.find({
      'homework.status': 'submitted'
    }).select('-password'); // Exclude the 'password' field

    if (!studentDetail) {
      // If no student detail found with the given ID and status "submitted", send a specific message
      console.log("No submitted homework found for ID:", id);
      return res.send({ message: 'No submitted homework found for this ID.' });
    }

    // If student detail exists, send it as a response
    console.log("Found student detail:", studentDetail);
    res.send(studentDetail);
  } catch (error) {
    console.error('Error retrieving student detail:', error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};


const updateHomeworkReview = async (req, res) => {
  console.log("Review Homework:", req.body);

  try {
    const { feedback, homeworkId } = req.body;
    const { id } = req.params;

    // Log to verify the incoming parameters
    console.log("Student ID:", id);
    console.log("Homework ID:", homeworkId);

    // Check if the student exists
    const student = await manageStudentDetail.findOne({ _id: id });
    if (!student) {
      console.log("Student not found");
      return res.status(404).send({ message: 'Student not found' });
    }

    // Log the student's homework array
    console.log("Student Homework:", student.homework);

    // Check if the specific homework exists in the student's data
    const homeworkIndex = student.homework.findIndex(hw => hw.homeworkId === homeworkId);
    if (homeworkIndex === -1) {
      console.log("Homework not found");
      return res.status(404).send({ message: 'Homework not found' });
    }

    // Update feedback and status for the specific homework
    student.homework[homeworkIndex].feedback = feedback;
    student.homework[homeworkIndex].status = "reviewed";

    // Save the updated student document
    const updatedStudent = await student.save();

    res.send({ message: 'Homework Feedback Updated Successfully', updatedStudent });
  } catch (error) {
    console.error('Error submitting Homework Review:', error);
    res.status(500).send({ error: 'Server error. Please try again.' });
  }
};




module.exports = {createHomework,getHomework,updateAssignHomework,deleteAssignHomework,getSubmittedHomework,updateHomeworkReview};

