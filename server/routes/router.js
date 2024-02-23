//Setting the api's for create user,read user,update user and delete user

const express = require('express');//require express
const router = express.Router();//require express router
const User = require('../models/userSchema');//require userschema
const loginModel = require('../models/loginModel')


//login call back
router.post ('/login',async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await loginModel.findOne({ email, password })
        if (!user) {
            return res.status(404).send('User Not Found')
        }
        res.status(200).json({
            success:true,
            user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error,
        });
    }
}) 

// Register call back
router.post ('/reguser',async(req,res) => {
    try{
        const newUser = new loginModel(req.body)
        await newUser.save()
        res.status(201).json({
            success:true,
            newUser,
        });
    }catch(error){
        res.status(400).json({
            success: false,
            error,
        });
    }
 }) 



//register user(use postman for testing)
router.post('/register', async (req, res) => {
    // Destructure the user data from the request body
    const { name, email, age, mobile, work, address, desc, linkedin, other, skills, experience, edu } = req.body;
    // Check if any required field is missing
    if (!name || !email || !age || !mobile || !work || !address || !desc || !linkedin || !other || !skills || !experience || !edu) {
        return res.status(422).json({ error: "plz fill all field properly" });
    }

    try {
        // Check if a user with the same email already exists
        const preuser = await User.findOne({ email: email });
        console.log(preuser);
        if (preuser) {
            return res.status(422).json({ error: "email already exist" });
        }
        else {
            // If the email is unique, create a new user using the User model and save it to the database
            const user = new User({ name, email, age, mobile, work, address, desc, linkedin, other, skills, experience, edu });
            await user.save();

            //res.status(201).json({message:"User registered sucessful"});
            res.status(201).json(user);
            console.log(user);
        }

    } catch (err) {
        //If there is an error during the registration process, return an error
        res.status(422).json(error)
    }

})


//get userdata(use postman for testing)
// Define a route for fetching all user data
router.get("/getdata", async (req, res) => {
    try {
        // Fetch all user data from the database using the User model
        const userdata = await User.find();
        // Respond with a status of 201 Created and the user data in JSON format
        res.status(201).json(userdata);
        console.log(userdata);
    }
    catch (err) {
        // If there is an error during the process, return an error response
        res.status(422).json(error)
    }
})


//get individual user(use postman for testing)
router.get("/getuser/:id", async (req, res) => {
    try {

        console.log(req.params);
        const { id } = req.params;
        const userindividual = await User.findById({ _id: id });
        console.log(userindividual);
        res.status(201).json(userindividual);
    }
    catch (err) {
        res.status(422).json(error)
    }
})

//update user data
router.patch("/updateuser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateuser = await User.findByIdAndUpdate(id, req.body, {
            new: true
        });
        console.log(updateuser);
        res.status(201).json(updateuser);
    }
    catch (error) {
        res.status(422).json(error);
    }
})

//delete user data
router.delete("/deleteuser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteuser = await User.findByIdAndDelete({ _id: id })
        
        console.log(deleteuser);
        res.status(201).json(deleteuser);
    }
    catch (error) {
        res.status(422).json(error);
    }
})


module.exports = router;


