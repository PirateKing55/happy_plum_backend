var manageFlashCards = require("../models/flashCards");

const createFlashCards = async (req, res) => {
    console.log("review",req.body)
  try {
    const { student_id } = req.body;

    // // Check if the homework already exists for this student_id
    // const existingTestAssessment = await manageFlashCards.findOne({ student_id });

    // if (existingTestAssessment) {
    //   // If homework already exists for this student, send a specific message
    //   return res.send({ message: ' Already Test-Assessment submitted' });
    // }

    // If homework does not exist, proceed to save it
    const newFlashCard = new manageFlashCards(req.body);
    await newFlashCard.save();
    
    // Example response for successful submission
    res.send({ message: 'Flash-Card created successfully.' });
  } catch (error) {
    console.error('Error submitting homework:', error);
    res.send({ error: 'Server error. Please try again.' });
  }
};

const getFlashCards = async (req, res) => {
  console.log("req.params",req.params.id)
  try {
    const id = req.params.id; // Assuming _id is passed as a route parameter

    // Find all test submissions associated with the given _id
    const flashCardList = await manageFlashCards.find({ student_id: id });

    if (flashCardList.length === 0) {
      // If no test submissions found for this _id, send a specific message
      return res.send({ message: 'No Flash-Cards submissions found for this ID.' });
    }

    // If homework submissions exist, send them as a response
    res.send(flashCardList);
  } catch (error) {
    console.error('Error retrieving Flash-Card submissions:', error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};


   

module.exports = {createFlashCards,getFlashCards};

