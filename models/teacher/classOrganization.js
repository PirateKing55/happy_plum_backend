const mongoose = require("mongoose");
mongoose.pluralize(null);

const manageClass = new mongoose.Schema({
    
    createdTId: { type: String, required: true },
    className:{ type: String, required: true },
    description:{ type: String, required: true },
    date:{ type: String, required: true },
    time:{ type: String, required: true },
    assignedStudents:[{sId:String,sName:String}]
  
});
module.exports = mongoose.model("class", manageClass);
