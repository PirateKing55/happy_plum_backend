// // ------------------   local db connection ----------------

// const mongoose = require("mongoose");
// const databaseConnection = mongoose.connect(
//   "mongodb://127.0.0.1:27017/HappyPlum"
// );

// // Get the default connection
// const db = mongoose.connection;

// // Event handlers for the connection
// db.on("connected", () => {
//   console.log("Connected to MongoDB");
// });

// db.on("error", (error) => {
//   console.error("MongoDB connection error:", error);
// });

// db.on("disconnected", () => {
//   console.log("Disconnected from MongoDB");
// });


// module.exports = databaseConnection;


// ----------------------  cluster atlas connection--------------

const mongoose = require("mongoose");

// MongoDB Atlas connection URI
const uri = "mongodb+srv://rameshramesh997:pOvTd7wdSaMTdaUP@cluster0.r2ztkdl.mongodb.net/HappyPlum?retryWrites=true&w=majority";

// Optional: mongoose options
const options = {
  useNewUrlParser: true,        // useNewUrlParser is deprecated but should be there for older MongoDB versions
  useUnifiedTopology: true,     // Use the new topology engine
  connectTimeoutMS: 30000,      // Timeout after 30 seconds
  socketTimeoutMS: 30000        // Socket timeout after 30 seconds
};

// Connect to MongoDB Atlas
mongoose.connect(uri, options)
  .then(() => {
    console.log("Connected to MongoDB Atlas");

    // You can start your application logic here
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

