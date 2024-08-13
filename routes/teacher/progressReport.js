var express = require("express");
var router = express.Router();

var {createProgressReport,getProgressReport,getAllStudent} = require("../../controllers/teacher/progressReport");

//get all students
router.get("/get-all-students",getAllStudent);

//student testAssessment submit
router.post("/create",createProgressReport);

//student get result submitted testAssessment get
router.get("/get/:id",getProgressReport);


module.exports = router;
