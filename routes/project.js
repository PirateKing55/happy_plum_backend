var express = require("express");
var router = express.Router();
var multer = require("../middleware/fileUpload");
var fileValidation = require("../middleware/fileValidation");
const {
  createProject
} = require("../controllers/project");

router.post(
  "/create",
  multer.single("projectDoc"),
  // fileValidation.validateSize,
  // fileValidation.validatepdfType,
  createProject
);

// router.get("/get-paper", paperGet);

// router.get("/download-paper/:id", downloadPaper);

// router.delete("/delete-paper/:id", paperDelete);

module.exports = router;
