var express = require("express");
var router = express.Router();

var {createFlashCards,getFlashCards} = require("../controllers/flashCards");

// //create questions by postman or teacher
// router.post("/questions",createQuestions);

//student testAssessment submit
router.post("/create",createFlashCards);

//student get result submitted testAssessment get
router.get("/get/:id",getFlashCards);


module.exports = router;
