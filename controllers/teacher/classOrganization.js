var manageclass = require("../../models/teacher/classOrganization");
// var manageUser = require("../../models/manageUser");
const createClass = async (req, res) => {
    console.log("review",req.body)
  try {
    const { className } = req.body;

    // Check if the class already exists for this student_id
    const existingClass = await manageclass.findOne({className});

    if (existingClass) {
      // If class already exists for this student, send a specific message
      return res.send({ message: ' Already Class Created' });
    }

    // If class does not exist, proceed to save it
    const newClass = new manageclass(req.body);
    await newClass.save();
    
    // Example response for successful submission
    res.send({ message: 'Class Created Successfully.' });
  } catch (error) {
    console.error('Error submitting Class:', error);
    res.send({ error: 'Server error. Please try again.' });
  }
};

const getClass = async (req, res) => {
  console.log("req.params",req.params.id)
  try {
    const id = req.params.id; // Assuming _id is passed as a route parameter

    // Find all test submissions associated with the given _id
    const classSubmissions = await manageclass.find({ createdTId: id });

    if (classSubmissions.length === 0) {
      // If no test submissions found for this _id, send a specific message
      return res.send({ message: 'No Class submissions found for this ID.' });
    }

    // If homework submissions exist, send them as a response
    res.send(classSubmissions);
  } catch (error) {
    console.error('Error retrieving Class submissions:', error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};


const updateClass = async (req, res) => {
  console.log("review",req.body)
try {
  const { id } = req.params;
  // Check if the class already exists for this student_id
  const existingClass = await manageclass.findOne({ _id:id });

  if (!existingClass) {
    // If class already exists for this student, send a specific message
    return res.send({ message: ' Class is not found '});
  }
  let updatedClass = await manageclass.findOneAndUpdate(
    { _id:id }, // Query condition based on the document's _id field
    { $set: req.body }, // Update object wrapped in $set to update specific fields
    { new: true } // Option to return the updated document
  );
 
  // Example response for successful submission
  res.send({ message: 'Class Updated Successfully.' });
} catch (error) {
  console.error('Error submitting Class:', error);
  res.send({ error: 'Server error. Please try again.' });
}
};

const deleteClass = async (req, res) => {
  // console.log("review",req.body)
try {
  const { id } = req.params;
  // Check if the class already exists for this student_id
  const existingClass = await manageclass.findOne({ _id:id });

  if (!existingClass) {
    // If class already exists for this student, send a specific message
    return res.send({ message: ' Class is not found '});
  }
  const classDelete = await manageclass.deleteOne({ _id: id });
  // Example response for successful submission
  res.send({ message: 'Class Deleted Successfully.' });
} catch (error) {
  console.error('Error submitting Class:', error);
  res.send({ error: 'Server error. Please try again.' });
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

const updateAssignStudent = async (req, res) => {
  const { classId, studentId, studentName } = req.body;

  try {
    let updatedJob = await manageclass.findOneAndUpdate(
      { _id: classId }, // Query condition based on the document's _id field
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



const deleteAssignStudent = async (req, res) => {
  const { classId, studentId } = req.body;

  try {
    let updatedJob = await manageclass.findOneAndUpdate(
      { _id: classId }, // Query condition based on the document's _id field
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
   

module.exports = {createClass,getClass,deleteClass,updateClass,getAllStudent,updateAssignStudent,deleteAssignStudent};

