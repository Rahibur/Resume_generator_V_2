// Import the mongoose library
const mongoose = require("mongoose");
// Get the MongoDB connection from config.env file DATABASE string
const DB =process.env.DATABASE;
// Connect to the MongoDB database using the connection string
mongoose.connect(DB).then(()=>{
    console.log(`connection successful`);
}).catch((err)=>console.log(err));





/* Here's a breakdown of the code:

Import Mongoose: Import the Mongoose library, which is an ODM (Object-Document Mapper) for MongoDB and Node.js.

Get Database Connection String: Retrieve the MongoDB connection string from the environment variable named "DATABASE." Environment variables are used to store configuration settings.

Connect to the Database: Use the mongoose.connect method to connect to the MongoDB database using the provided connection string (DB).

Handle Connection Promise:

If the connection is successful (then block), log a success message to the console.
If there is an error during the connection (catch block), log the error to the console. */