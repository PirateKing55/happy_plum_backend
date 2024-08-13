var manageUser = require("../models/manageUser");
var manageStudentDetail = require("../models/studentDetail");
const Jwt = require("jsonwebtoken");

const jwtKey = "happyplum";



const register = async (req, res) => {
  try {
    const emailMatch = await manageUser.findOne({ email: req.body.email });
    if (emailMatch) {
      return res.status(400).send({ error: "Email already exists" });
    }

    const newUser = new manageUser({
      fullName: req.body.firstName + " " + req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      type: req.body.type,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // Create a new student detail only if the user type is Student or Parent
    if (savedUser.type === 'Student' || savedUser.type === 'Parent') {
      await new manageStudentDetail({
        sId: savedUser._id,
        fullName: req.body.firstName + " " + req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      }).save();
    }

    res.status(201).send({ message: "User successfully registered!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};


const login = async (req, res) => {
  try {
    const user = await manageUser.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ error: "Email doesn't exist" });
    }

    // Generate JWT token
    Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        console.error("Token generation error:", err);
        return res.status(500).send({ error: "Something went wrong in token generation" });
      }
      res.send({ user, auth: token, message: "User logged in successfully" });
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};









module.exports = { login, register };

