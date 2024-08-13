var manageMessage = require("../../models/teacher/message");
var manageUser = require("../../models/manageUser");
const createMessage = async (req, res) => {
    console.log("review",req.body)
  try {
    const { name } = req.body;

    // // Check if the homework already exists for this student_id
    // const existingMessage = await manageMessage.findOne({});

    // if (existingMessage) {
    //   // If homework already exists for this student, send a specific message
    //   return res.send({ message: ' Already assignment title exist' });
    // }

    // If homework does not exist, proceed to save it
    const newMessage = new manageMessage(req.body);
    await newMessage.save();
    
    // Example response for successful submission
    res.send({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error in sending message:', error);
    res.send({ error: 'Server error. Please try again.' });
  }
};

const getMessageByEmail = async (req, res) => {
  console.log("req.params",req.params.id)
  try {
    const email = req.params.id; // Assuming _id is passed as a route parameter

    // Find all test submissions associated with the given _id
    const messageSubmissions = await  manageMessage.find({ recipient: email});

    if (messageSubmissions.length === 0) {
      // If no test submissions found for this _id, send a specific message
      return res.send({ message: 'No messages found for this ID.' });
    }

    // If homework submissions exist, send them as a response
    res.send(messageSubmissions);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

const updateMessage = async (req, res) => {
  console.log("review",req.body)
try {
  const { id } = req.params;
  // Check if the class already exists for this student_id
  const existingMessage = await manageMessage.findOne({ _id:id });

  if (!existingMessage) {
    // If class already exists for this student, send a specific message
    return res.send({ message: ' Message is not found '});
  }
  let updatedMessage = await manageMessage.findOneAndUpdate(
    { _id:id }, // Query condition based on the document's _id field
    { $set: req.body }, // Update object wrapped in $set to update specific fields
    { new: true } // Option to return the updated document
  );
 
  // Example response for successful submission
  res.send({ message: ' Message Read Successfully.' });
} catch (error) {
  console.error('Error submitting Message:', error);
  res.send({ error: 'Server error. Please try again.' });
}
};

const deleteMessage = async (req, res) => {
  // console.log("review",req.body)
try {
  const { id } = req.params;
  // Check if the class already exists for this student_id
  const existingMessage = await manageMessage.findOne({ _id:id });

  if (!existingMessage) {
    // If class already exists for this student, send a specific message
    return res.send({ message: ' Message is not found '});
  }
  const MessageDelete = await manageMessage.deleteOne({ _id: id });
  // Example response for successful submission
  res.send({ message: 'Message Deleted Successfully.' });
} catch (error) {
  console.error('Error deleting message:', error);
  res.send({ error: 'Server error. Please try again.' });
}
};

const getAllUser = async (req, res) => {
  console.log("req.params",req.params.id)
  try {
    const id = req.params.id; // Assuming _id is passed as a route parameter

    // Find all test submissions associated with the given _id
    const studentSubmissions = await manageUser.find(
        
    );

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


   

module.exports = {createMessage,getMessageByEmail,updateMessage,deleteMessage,getAllUser};

