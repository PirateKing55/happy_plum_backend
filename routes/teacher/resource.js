var express = require("express");
var router = express.Router();
var multer = require("../../middleware/fileUpload");
var fileValidation = require("../../middleware/fileValidation");
const {
  createResource,
  getResource,
  createLesson
} = require("../../controllers/teacher/resource");

//resource library

router.get("/get",getResource);

//upload and share
router.post(
  "/upload-share",
  multer.single("resourceFile"),
  // fileValidation.validateSize,
  // fileValidation.validatepdfType,
  createResource
);



//upload and share
router.post(
  "/create-lesson",

  createLesson
);

module.exports = router;
