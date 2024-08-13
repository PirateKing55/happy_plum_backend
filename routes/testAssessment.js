var express = require("express");
var router = express.Router();

var {submitTestAssessment,getTestAssessment} = require("../controllers/testAssessment");

// //create questions by postman or teacher
// router.post("/questions",createQuestions);

//student testAssessment submit
router.post("/submit",submitTestAssessment);

//student get result submitted testAssessment get
router.get("/get/:id",getTestAssessment);

module.exports = router;
