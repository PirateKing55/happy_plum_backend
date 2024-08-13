var express = require("express");
var router = express.Router();

var {getProfiles} = require("../../controllers/teacher/communicationTool");

//get all students and parents profiles get
router.get("/get-profiles",getProfiles);

//student testAssessment submit
// router.post("/create",createProgressReport);

//student get result submitted testAssessment get
// router.get("/get/:id",getProgressReport);


module.exports = router;