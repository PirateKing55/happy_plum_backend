var express = require("express");
var router = express.Router();

var {reviewSheetSubmit} = require("../controllers/reviewSheet");



//student homework submit
router.post("/submit",reviewSheetSubmit);

// //student submitted homework get
// router.get("/get/:id",homeworksView);


module.exports = router;
