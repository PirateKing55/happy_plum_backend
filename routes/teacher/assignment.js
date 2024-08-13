// var express = require("express");
// var router = express.Router();

// var {createAssignment,getHomework,getTestAssessment,updateAssignment,deleteAssignment,
//     updateAssignStudentHomework,deleteAssignStudentHomework,updateAssignStudentTest,deleteAssignStudentTest,
//     getSubmissionHomework,getSubmissionTest,updateHomeworkReview,updateTestReview} = require("../../controllers/teacher/assignment");

// //get all students
// // router.get("/get-all-students",getAllStudent);

// //createm new assignment  tid
// router.post("/create",createAssignment);

// // get all assignments by tid
// router.get("/get-homework-view/:id",getHomework);

// // get all assignments by tid
// router.get("/get-test-view/:id",getTestAssessment);

// // update  assignment by assegnment id
// router.put("/update/:id",updateAssignment);
// // delete assignment by assegnment id
// router.delete("/delete/:id",deleteAssignment);

// // assign and deassign homework to student
// router.put("/update",updateAssignStudentHomework);
// router.delete("/delete",deleteAssignStudentHomework);

// // assign and deassign test assessment to student
// router.put("/update",updateAssignStudentHomework);
// router.delete("/delete",deleteAssignStudentHomework);

// // 3.submitted review
// //get all submitted homeworks and test assessments
// router.get("/get-all-homework",getSubmissionHomework);
// router.get("/get-all-test",getSubmissionTest);

// //update review homework and test assessment
// router.put("/update-homework-review/:id",updateHomeworkReview);
// router.put("/update-test-review/:id",updateTestReview);




// module.exports = router;



var express = require("express");
var router = express.Router();

var {createHomework,getHomework,updateAssignHomework,deleteAssignHomework,getSubmittedHomework,updateHomeworkReview} = require("../../controllers/teacher/assignment");

// Homework api s
router.post("/create-homework",createHomework);  //post ===create /submit
router.get("/view-homework/:id",getHomework);     //get  === view  /read
// assign and deassign homework to student
router.put("/update-assign-homework",updateAssignHomework);  //put ===update /modify
router.delete("/delete-assign-homework",deleteAssignHomework);  //delete ===delete/erase

router.get("/view-all-submitted-homework", getSubmittedHomework);

router.put("/update-homework-review/:id",updateHomeworkReview);

module.exports = router;

