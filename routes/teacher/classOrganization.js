var express = require("express");
var router = express.Router();

var {createClass,getClass,deleteClass,updateClass,updateAssignStudent,deleteAssignStudent} = require("../../controllers/teacher/classOrganization");

//get all students
// router.get("/get-all-students",getAllStudent);

//createm new class  tid
router.post("/create",createClass);

// get all classes by tid
router.get("/get/:id",getClass);

router.put("/update/:id",updateClass);
// // de-asign student to class (update class collection)
router.delete("/delete/:id",deleteClass);

// asign student to class (update class collection)
router.put("/update",updateAssignStudent);
// // de-asign student to class (update class collection)
router.delete("/delete",deleteAssignStudent);

module.exports = router;
