const mongoose = require("mongoose");
mongoose.pluralize(null);

const manageMessage = new mongoose.Schema({
    sender:{type: String, required: true},
    recipient: {type: String, required: true},
    subject: {type: String, required: true},
    message: {type: String, required: true},
    date:{type: String, required: true,default:new Date()},
    isRead:{type: Boolean, required: true,default:false}
});
module.exports = mongoose.model("message", manageMessage);
