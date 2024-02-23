//Require mongoose
const mongoose = require ('mongoose');
//write form related input filleds data in backend.
const userSchema = new mongoose.Schema({
   
    
    name:{
        type:String,
        required:true   
    }, 
    email: {
        type:String,
        required:true,
        unique:true
    }, 
    age: {
        type:String,
        required:true
    }, 
    mobile: {
        type:Number,
        required:true
    }, 
    work: {
        type:String,
        required:true
    }, 
    address: {
        type:String,
        required:true
    }, 
    desc: {
        type:String,
        required:true
    },
    linkedin: {
        type:String,
        required:true
    },
    other: {
        type:String,
        required:true
    },
    skills: {
        type:String,
        required:true
    },
    experience: {
        type:String,
        required:true
    },
    edu: {
        type:String,
        required:true
    }
    
   

})
// Create a Mongoose model named 'User' based on the user schema
const User = mongoose.model('USER',userSchema);
module.exports =User; // Export the User model to be used in other parts of the application