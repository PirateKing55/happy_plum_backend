var express = require("express");
var router = express.Router();

var {createMessage,getMessageByEmail,updateMessage,deleteMessage,getAllUser} = require("../../controllers/teacher/message");

// get all get-all-users
router.get("/get-all-users",getAllUser);

//createm new Message  tid
router.post("/create",createMessage);

// get all Messages by tid
router.get("/get/:id",getMessageByEmail);

router.put("/update/:id",updateMessage);

// // de-asign student to class (update class collection)
router.delete("/delete/:id",deleteMessage);

// // asign student to class (update class collection)
// router.put("/update",updateAssignStudent);
// // // de-asign student to class (update class collection)
// router.delete("/delete",deleteAssignStudent);


module.exports = router;
