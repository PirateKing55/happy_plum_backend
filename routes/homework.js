var express = require("express");
var router = express.Router();

var {getAssignedHomework,submitAssignedHomework,getResultHomework} = require("../controllers/homeWork");
router.get("/assigned-homework-get/:id", getAssignedHomework);
router.put("/assigned-homework-submit/:id", submitAssignedHomework);
router.get("/result-homework-get/:id", getResultHomework);

module.exports = router;
