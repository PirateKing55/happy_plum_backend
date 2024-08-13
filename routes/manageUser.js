var express = require("express");
var router = express.Router();

var {register,login} = require("../controllers/manageUser");

router.post("/register", register);

router.post("/login", login);


module.exports = router;
