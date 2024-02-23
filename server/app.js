// Import required libraries and modules .env,mongoose, express
const dotenv =require("dotenv");
const mongoose = require ('mongoose');  
const express = require('express');
const app = express();
dotenv.config({path:'./config.env'});// Load environment variables from the config.env file
require('./db/conn');// Connect to the MongoDB database
const PORT = process.env.PORT;// Set the port for the server to listen on
app.use(express.json());
const User = require('./models/userSchema');// Import the User model (defined using Mongoose and the userSchema)

app.use('/api/v1', require('./routes/router'));// Use the router defined in the router.js file


// Start the server and listen on the specified port
app.listen(PORT,()=>{
    console.log(`server is at port number ${PORT}`);
});

/*
//config.env

PORT=8000
DATABASE = mongodb+srv://Rahib:B450Mplus@cluster0.g8wiw4b.mongodb.net/mernstack?retryWrites=true&w=majority
*/