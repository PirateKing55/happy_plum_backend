var manageResource = require("../../models/teacher/resource");
var manageLesson= require("../../models/teacher/lesson");
const path = require("path");



const createResource = async (req, res) => {
    try {
      const { uploadId,title,resourceType } = req.body;
  
      // Check if the project document already exists for this student_id and file name
      // const existingResource = await manageResource.findOne({
      //   uploadId,
      //   resourceName: req.file?.originalname
      // });
  
      // if (existingResource) {
      //   // If project document already exists for this student, send a specific message
      //   return res.send({ message: 'File name already exists. Please do not upload again.' });
      // }
  
      // If project document does not exist, proceed to save it
      const newProject = new manageResource({
        uploadId,title,resourceType,resourceName:req.file?.originalname,resourcePath:req.file?.path
      });
  
      await newProject.save();
  
      // Example response for successful submission
      res.send({ message: 'resource uploaded successfully.' });
    } catch (error) {
      console.error('Error submitting resource:', error);
      res.send({ error: 'Server error. Please try again.' });
    }
  };
  
  const getResource = async (req, res) => {
    console.log("req.params",req.params.id)
    try {
      const id = req.params.id; // Assuming _id is passed as a route parameter
  
      // Find all test submissions associated with the given _id
      const resourceSubmissions = await manageResource.find();
  
      if (resourceSubmissions.length === 0) {
        // If no test submissions found for this _id, send a specific message
        return res.send({ message: 'No resource submissions found for this ID.' });
      }
  
      // If homework submissions exist, send them as a response
      res.send(resourceSubmissions);
    } catch (error) {
      console.error('Error retrieving Progress-Report submissions:', error);
      res.status(500).json({ error: 'Server error. Please try again.' });
    }
  };

  const createLesson = async (req, res) => {
    try {

  const {title}=req.body
      // Check if the project document already exists for this student_id and file name
      const existingLesson = await manageLesson.findOne({title});
  
      if (existingLesson) {
        // If project document already exists for this student, send a specific message
        return res.send({ message: 'Lesson already exists. ' });
      }
  
      // If project document does not exist, proceed to save it
      const newLesson = new manageLesson(req.body);
  
      await newLesson.save();
  
      // Example response for successful submission
      res.send({ message: 'lesson created successfully.' });
    } catch (error) {
      console.error('Error submitting lesson:', error);
      res.send({ error: 'Server error. Please try again.' });
    }
  };




module.exports = { createResource,getResource,createLesson};
