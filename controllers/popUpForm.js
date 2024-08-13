var managepopUpForm  = require("../models/popUpForm");


const popUpForm = async (req, res) => {
   
        const emailMatch = await managepopUpForm.findOne({ email: req.body.email });
        if (emailMatch) {
            res.send({ error:"email already exist"});
          } else 
            
         { await new managepopUpForm({
            
            
            name:req.body.name,email:req.body.email,type:req.body.phonenumber}).save();
      res.send({ message: "Successfully Submitted details" });}
   
  };

 

module.exports = {popUpForm};

