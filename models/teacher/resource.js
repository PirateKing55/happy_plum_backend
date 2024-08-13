
const mongoose = require("mongoose");
mongoose.pluralize(null);

const manageResource = new mongoose.Schema({
    uploadId: String,title:String,resourceType:String, resourceName: String,resourcePath:String
  
});
module.exports = mongoose.model("resource", manageResource);
