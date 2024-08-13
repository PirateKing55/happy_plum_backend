var manageProject = require("../models/project");
const path = require("path");



const createProject = async (req, res) => {
    try {
      const { studentId } = req.body;
  
      // Check if the project document already exists for this student_id and file name
      const existingProject = await manageProject.findOne({
        studentId,
        'projectDoc.name': req.file?.originalname
      });
  
      if (existingProject) {
        // If project document already exists for this student, send a specific message
        return res.send({ message: 'File name already exists. Please do not upload again.' });
      }
  
      // If project document does not exist, proceed to save it
      const newProject = new manageProject({
        studentId,
        projectDoc: {
          name: req.file?.originalname,
          path: req.file?.path,
        },
      });
  
      await newProject.save();
  
      // Example response for successful submission
      res.send({ message: 'Project submitted successfully.' });
    } catch (error) {
      console.error('Error submitting project:', error);
      res.send({ error: 'Server error. Please try again.' });
    }
  };
  

const paperGet = async (req, res, next) => {
  try {
    let view = await PaperTitle.find();
    res.send(view);
  } catch (error) {
    console.error("Error retrieving paper titles:", error);
    res.status(500).send({ error: "Error retrieving paper titles" });
  }
};

const paperDelete = async (req, res, next) => {
  try {
    const paper = await PaperTitle.deleteOne({ _id: req.params.id });
    if (paper.acknowledged) {
      let view = await PaperTitle.find();
      res.send(view);
    } else {
      res.status(404).send({ message: "Record Not Found" });
    }
  } catch (error) {
    console.error("Error deleting paper title:", error);
    res.status(500).send({ error: "Error deleting paper title" });
  }
};

const downloadPaper =  async (req, res) => {
  const id = req.params.id;
  let view = await PaperTitle.find({_id:id}, { resultDoc: 1 });

  console.log("prathamesh", view[0].resultDoc.path);
  console.log("prathamesh", view[0].resultDoc);
  const basePath="D:\\prernafolderstructure\\PrernaAcademy-BackEnd"
  const filePath = path.join(basePath, view[0].resultDoc.path);
  res.download(filePath, "downloaded_file.pdf", (error) => {
    if (error) {
      console.error("Error in downloadPDF:", error);
      res.status(500).json({ error: "Failed to download PDF" });
    }
  });
};


module.exports = { createProject};
