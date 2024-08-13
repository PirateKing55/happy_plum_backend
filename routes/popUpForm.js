var express = require("express");
var router = express.Router();

var {popUpForm} = require("../controllers/popUpForm");

router.post("/", popUpForm);



module.exports = router;
