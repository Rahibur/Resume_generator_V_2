
/*   
(Backend work 80%)

-Set environment by creating folders and downloading packages(step-1)
-undertsanding middleware(step-2)
-Creating a server folder and doing confirmation if server running or not(step 3)
-connecting database to mongodb(step-4)
-Creating the User Schema & Model(step-5)
-Express Router Middleware Setup & Getting Data Back From POSTMAN to Our MERN Application terminal(working on postman)(step-6)
-Storing the Post Registration User Data in the Online Database using Express & Mongoose(working on postman)(step 7-8)
-Create a Login Route with Form Validation using Express and Mongoose(working on postman)(step-9)
-Secure password by hashing & VERIFY  IF THE USER HAS INSERT CORRECT PASSWORD OR NOT(working on postman)(step 10-11)
-generating webtoken(working on postman)(step-12)


(Frontend.+ Backend 20%)Client folder work

-Create Navbar(code related files are:Navbar.js,index.html,App.js)(step 13-14)
	-GOTO client>public>index.html and copy paste  js bootstrap links
	-create component folder and navbar menu pages files
	
-Creating routes for Navbar menues(code related files are:Navbar.js,App.js)
	-Open the New Page Without Reloading or Refresh the Page(step-15)
	
-creating navbar menu pages(step 16-21)

-Signup page works (code in:signup.js)
	- Get user data in frontend browser console.(step-22) 
	-Stored Registration Form Data in Database(step-23)

-login page works(code in:login.js)
	-Implement Login System with JWT & Stored Cookie(step-24)

-about us page autjentication(codes are in:about.js,app.js,authenticate.js,auth.js)
	-User Authentication in MERN Stack Using JWT (step-25)
	- ABOUT PAGE AUTHENTICATION Check User Login or Not (step-26)
	-Get About Us Page Data Dynamic After User Authentication(step-27)

-Making Home page dynamic after login(step-28)(codein:home.js)

-logout implementing (step-29)(codes in:navbar.js,logout.js,,auth.js,app.js)

-toggling login and logout(codein:Navbar.js,logout.js,login.js,usereducer.js, App.js)
	-create context api and usereducer hooks(step-30)

*/


// Run=> npm init -y // It will download package.json file 
// Run => npm i express //This will download node-modules,package-lock.json file

//STEP-1 : Create folder called server, inside create file name app.js
/* Using express js code to create server and print hello world code in home,about,login,singup page */
//THESE CODE WRITTEN TEMPORARY
const express = require('express');
const app = express();
app.get('/',(req,res) => {
    res.send(`Hello world from server`);
});

app.get('/about',(req,res) => {
    console.log(`Hello my about`);
    res.send(`Hello about world from server`);
});


app.get('/contact',(req,res) => {
    res.cookie("Test",'thapa');
    res.send(`Hello contact world from server`);   
});
app.get('/signin',(req,res) => {
    res.send(`Hello login world from server`);
});

/* confirms if our server is runnig or not */
//PORT is a keyword which value is server value such as 3000. it is in config.env file.of server side.
app.listen(PORT,() =>{
    console.log(`server is running at port no ${PORT}`);
})



/* Step-2 MernThapa thought us about middleware. IT works as a gate between two pages in the middle.After
fulfillment of a request middleware gives access to another page.watch video no-4 of this series https://youtu.be/JHOszqPHwMg */
//output: Hello my middleware
//Hello my about
//middleware code temporary written in app.js file
const middleware =(req,res,next) =>{
    console.log(`Hello my middleware`);
    next();
}

app.get('/',(req,res) => {
    res.send(`Hello world from server`);
});

app.get('/about',middleware,(req,res) => {
    console.log(`Hello my about`);
    res.send(`Hello about world from server`);
});



/*step-3 connecting database to mongodb. Details explained in video no-5 https://youtu.be/68Jd7GXZPe8 */
//Goto mongodb,create a project,create a database name and collection in cluster then copy the constDB and write code...
//Run=>npm i mongoose
// Code temporary written in app.js
const mongoose = require ('mongoose');  
const DB ='mongodb+srv://Rahman:B450Mplus@cluster0.fkt4uzn.mongodb.net/mernstack?retryWrites=true&w=majority';
mongoose.connect(DB).then(()=>{
    console.log(`connection successful`);
}).catch((err)=>console.log(err));



/*Step-4 Secure Your Code by Keeping your Password, API Keys Secret with DOTENV in Mern. video no-6 https://youtu.be/jxv53raRvRU */
//Run=> npm i dotenv (it will add dotenv package in package.json file)
//Run=> type null > config.env (it will create congig.env file in server folder.) Type these in cofig.env file
PORT=3000
DATABASE = mongodb+srv://Rahman:B450Mplus@cluster0.fkt4uzn.mongodb.net/mernstack?retryWrites=true&w=majority
SECRET_KEY = MYNAMETYOPLPLPELTRIOPMJKSBGFHTYP

//Type this in app.js
const dotenv =require("dotenv");//requiring the packaje
dotenv.config({path:'./config.env'});//It has been declared ,so no need to call database every time in every page
require('./db/conn');//connection with the config.env
const PORT = process.env.PORT;//calling the port

//create a folder db and cretae file conn.js
//get all the codes from step-3 and paste it on conn.js 
const mongoose =require('mongoose');
const DB =process.env.DATABASE;//this line connects to config.env
mongoose.connect(DB).then(()=>{
    console.log(`DB Connected successfuly`);
}).catch((err)=> console.log(err));



/*Step-5 Creating the User Schema & Model for our MERN Project video no-7 https://youtu.be/OgfiX8514CI */

//create a folder named Model inside model crate a file named UserSchema.js type these schemas
const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true   
    }, 
    email: {
        type:String,
        required:true
    }, 
    phone: {
        type:String,
        required:true
    }, 
    work: {
        type:String,
        required:true
    }, 
    password: {
        type:String,
        required:true
    }, 
    cpassword: {
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    tokens: [
        {
            token:{
                type:String,
                required:true
            }
        }

    ]    

})
//collection creation and connect with collection
const User = mongoose.model('USER',userSchema);
module.exports =User;




/*STEP-6  Express Router Middleware Setup & Getting Data Back From POSTMAN to Our MERN Application terminal VIDEO NO-8 https://youtu.be/kIfQofgKkPY */

// crete a folder named router,create a file named auth.js 
//Here we want to simplify our code in app.js file..so we linked the router files in app.js file
app.use(require('./router/auth'));
// Goto auth.js and start typing these codes...
const express = require ('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.send(`Hello world from server router js`);
});//here instead of app.get we just called router.get and when the code will run it will execute the router.get path first because we have attached it first.this is why the code will not be able to execute till the app.get part and show the router pages code in website

//write this code to auth.js temporarily to test data in postman
router.post('/register',(req,res) => {
    console.log(req.body);
    res.send(message: req.body);
});
module.exports = router;
//Before using middleware goto postman create a project for testing datas
//write this line of code to app.js
app.use(express.json());//it is a middleware it will convert json data to object and show it to us in terminal and postman






/*STEP-7 Storing the User Data in the Online Database using Express & Mongoose | Promises Version video no 9 https://youtu.be/isNJP9qG9Vg */
//code written in auth.js
//using promises to upload data to mongodb
router.post('/register',(req,res)=>{
    const {name,email,phone,work,password,cpassword}=req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"plz fill it"});
    } //if any of the filled is empty then it will throw error
    
    User.findOne({ email: email})
        .then((userExist)=>{ //it will return promises
            if(userExist){
                return res.status(422).json({error:"email already exist"});
            } //if email already exist then it will throw error

            const user = new User({name,email,phone,work,password,cpassword});

            user.save().then(()=>{ //it will return promises
                res.status(201).json({message:"User egister sucessful"});
            }).catch((err) => res.status(500).json({error:"Failes to registered"}));

        }).catch(err =>{console.log(err);});
});


//OR

/*STEP-8 Post Registration Data To MongoDB Atlas DB with Express & Mongoose | Async-Await Version video no 10 https://youtu.be/jMLWT7nFhoc */


router.post('/register',async (req,res)=>{
    const {name,email,phone,work,password,cpassword}=req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"plz fill all field properly"});
    }

    try{
     const userExist = await User.findOne({ email: email});
     if(userExist){
        return res.status(422).json({error:"email already exist"});
     }else if(password != cpassword){
        return res.status(422).json({error:"password not matching"});

     }else{
        const user = new User({name,email,phone,work,password,cpassword});
        //----In step 10 a hasing function will work before save method.
        await user.save();
  
       res.status(201).json({message:"User registered sucessful"});
     }
        
    }catch(err){
        console.log(err);
    }
       
});



/*STEP-9 Create a Login Route with Form Validation using Express and Mongoose video no-12 https://youtu.be/ejWcur2EVa4 */
//goto auth.js and type these code for login route

require('../db/conn');
const User = require("../model/userSchema");
//login route
//after writting this code we check in postman if user signed in successfully then response willbe message in postman and all data of user willbe in terminal,if not then it will show 400 error
router.post('/signin', async (req,res) =>{
    try
    {
        const{email,password} =req.body;
        if(!email || !password){
            return res.status(400).json({error:"Please fill the data"})
            }

        const userLogin = await User.findOne({email:email});

        console.log(userLogin);
        if(!userLogin){
            res.status(400).json({error:"invalid credencials"});
        }else{
            res.json({message:"user singin successfuly"});
            }

    }catch(err){
    console.log(err);
    }

});



/*STEP-10 How to Secure  Password? Password Hashing using Bcrypt.JS VIDEO NO 13 https://youtu.be/OHRHSZTFKjY */
// Run=> npm i bcrypt.js (it will add bcrypt.js package)
//codes will be write on UserSchema.js file. And linked with auth.js register file.
//we are hashing the password
userSchema.pre('save',async function(next){
     if(this.isModified('password')){
         this.password = await bcrypt.hash(this.password,12);
         this.cpassword = await bcrypt.hash(this.cpassword,12);
     }
     next();
 });
 //collection creation
const User = mongoose.model('USER',userSchema);
module.exports =User;



/* STEP-11  Check Hash Password and Email & Implementing Login Functionality in MERN App(TO VERIFY  IF THE USER HAS INSERT CORRECT PASSWORD OR NOT) VIDEO NO 15 https://youtu.be/HovlQod_EN8 */
//write code in auth.js
//login route
const bcrypt = require('bcryptjs');//define this in auth.js and userSchema.js
const { signedCookie } = require('cookie-parser');

router.post('/signin', async (req,res) =>{
    try{
    //     const{email,password} =req.body;
    //     if(!email || !password){
    //         return res.status(400).json({error:"Please fill the data"})
    //     }

    //    const userLogin = await User.findOne({email:email});

    
    if(userLogin){
        const isMatch = await bcrypt.compare(password,userLogin.password);//If user password matches with database password then user login successful
        
        if(!isMatch){
            res.status(400).json({error:"invalid credencials"});//if email,password is wrong then this error occur

        }else{
            res.json({message:"user singin successfuly"});
        }
    }
    else{
     res.status(400).json({error:"invalid credencials"});//if user fill wrong information then this error occur

    }
    
     
    }catch(err){
        console.log(err);
    }




/*STEP-12 Generate jwt token and stored in database + stored in web cookies MERN Stack video no 16 https://youtu.be/Pg7p2F8zI5I  Video no 17 https://youtu.be/wAFoxpGxaw0 */
//Run=> npm i jsonwebtoken (it will add token package in package.json)
//write code in auth.js
const jwt = require('jsonwebtoken');//define this to auth.js and userschema.js
router.post('/signin', async (req,res) =>{
    // try{
        // const{email,password} =req.body;
        // if(!email || !password){
        //     return res.status(400).json({error:"Please fill the data"})
        // }

        // const userLogin = await User.findOne({email:email});

    //console.log(userLogin);
    if(userLogin){
        // const isMatch = await bcrypt.compare(password,userLogin.password);
        const  token = await userLogin.generateAuthToken();
        console.log(token);//code for token generation
        res.cookie("jwtoken",token,{//using res.cookie() to generated tokens will stored in cookies
            expires:new Date(Date.now()+2589200000),//token will be expired after this particular date
            httpOnly:true //token is added to http
        });

    //     if(!isMatch){
    //         res.status(400).json({error:"invalid credencials"});

    //     }else{
    //         res.json({message:"user singin successfuly"});

    //     }
    // }
    // else{
    //  res.status(400).json({error:"invalid credencials"});

    // }
    
     
    // }catch(err){
    //     console.log(err);
    // }
    // console.log(req.body);
    
})


//goto userSchema.js
//add tokens field to userschema.js
tokens: [
    {
        token:{
            type:String,
            required:true
        }
    }

]    
//we are generating token
/*
This code is defining a method called generateAuthToken on a user schema in a Node.js application. The method generates a JSON Web Token (JWT) using the user's ID and a secret key stored in an environment variable.

Here is how the method works:

It first generates a JWT using the jwt.sign() method from the jsonwebtoken package. The token is signed with the user's ID (this._id) as the payload, and a secret key that is stored in an environment variable (process.env.SECRET_KEY).

It then updates the tokens array on the user model by adding the newly generated token to the end of the array. The tokens array is used to store all of the JWTs generated for a given user.

It saves the updated user model to the database using the save() method.

Finally, the method returns the generated token.

If any errors occur during this process, the method will catch the error and log it to the console.

*/
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await  this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}




/*============================================END BACKEND================================================================================*/
/*============================================STARTING FRONTEND================================================================================*/


/*STEP 13 Start Front-End with ReactJS | Hello World using React JS in MERN STACK video no 18 https://youtu.be/rqog71QNVZU */

//Run=>npx create-react-app client (this will create a folder named client)

/* STEP-14 Create Responsive NAVBAR (MENU) Of Our MERN Project using ReactJS VIDEO NO 20 https://youtu.be/d40WT32QJgU */

//GOTO client>public>index.html and copy paste these js bootstrap links
<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js" integrity="sha384-+sLIOodYLS7CIrQpBjl+C7nPvqq+FbNUBDunl/OZv93DB7Ln/533i8e/mZXLi/P+" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>


//Run=> npm i bootstrap in terminal
//inside client folders src folder create a new folder named components & inside components create some files named About.js,contact.js,Home.js,Navbar.js,Login.js,Signup.js
//Below Code of navbar.js

/*This code defines a functional React component called Navbar that renders a Bootstrap navigation bar based on the user's login status. It also imports the necessary dependencies such as React, useContext, NavLink, and logo.

The UserContext is imported from the App component and is used to retrieve the current user's login state, as well as to update it in the case of a logout action.

The component defines a nested functional component called RenderMenu, which returns a list of navigation links based on the user's login status. If the user is logged in (state is truthy), the component renders links to the home, about, contact, and logout pages. If the user is not logged in (state is falsy), the component renders links to the home, login, and registration pages.

Finally, the component returns the Bootstrap navigation bar markup that contains the app logo, a button that toggles the navigation menu, and the RenderMenu component. The navigation links are rendered conditionally based on the user's login status.
*/


//Importing necessary dependencies
import React,{useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';//This helps to Open the New Page Without Reloading or Refresh the Page with REACT-ROUTER-DOM
import logo from "../images/logo_1.png";
import { UserContext } from '../App';

const Navbar =()=>{
  //The UserContext is imported from the App component and is used to retrieve the current user's login state, as well as to update it in the case of a logout action.
  const {state,dispatch} = useContext(UserContext);
  const RenderMenu = () =>{
    if(state){
      return(
        <>
        
        <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span class="sr-only">(current)</span></NavLink>
        </li>
      <li class="nav-item">
        <NavLink className="nav-link" to="/about">About</NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link" to="/contact">Contact</NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link" to="/logout">Logout</NavLink>
      </li>
        
        
        </>
      )
    }else{
      return (
        <>
            <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span class="sr-only">(current)</span></NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link" to="/login">Login</NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link" to="/signup">Registration</NavLink>
      </li>
      
        
        </>
      )
    }
  }
  return (
    <>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
 <NavLink className="navbar-brand" to="#">
     <span className='justDemo'><b>Biogenerator</b></span>
 </NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <RenderMenu/>
    </ul>
  </div>
</nav>
      
    </>
  )
}
export default Navbar




/*STEP 15 How to Open the New Page Without Reloading or Refresh the Page with REACT-ROUTER-DOM VIDEO NO 21 https://youtu.be/u9e6jadCpgc */

//Run=> npm i react-router-dom
//we worked App.js and Navbar.js for reloading concepts
//Below line  is imported in Navbar.js of client folder see step 14
import { NavLink } from 'react-router-dom';//This helps to Open the New Page Without Reloading or Refresh the Page with REACT-ROUTER-DOM

//Below code is for App.js of client folder
/* 
This is the main file of a React application that imports several dependencies and components to render a complete user interface.

The component imports several components from the project, such as Navbar, Home, About, Contact, Login, Signup, Errorpage, and Logout. It also imports the Routes and Route components from the react-router-dom library to define the navigation routes of the application.

The component defines a context using the createContext function and exports it as UserContext. The UserContext is used to manage the state of the application using the useReducer hook, which is initialized with an initial state and a reducer function defined in the UseReducer.js file.

The App component renders the UserContext.Provider component that wraps the Navbar component and the Routes component, which render the defined routes of the application. The UserContext.Provider component provides the state and dispatch values to all components that are nested inside it through the UserContext.

Finally, the component exports the App component to be used as the root component of the application.

*/

//imported several dependencies
import React, { createContext, useReducer } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import "./App.css";
import "./responsive.css";
//defining the navigation Routes of the application
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
//Those are linked page with navbar
import Navbar from './components/Navbar'; //Imported navbar because we have used it inside he userContext for routing
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Errorpage from './components/Errorpage';
import Logout from './components/Logout';


import { initialState,reducer } from './reducer/UseReducer';

 //context api
export const UserContext = createContext();

const App =()=>{
 
  const [state,dispatch] = useReducer(reducer,initialState);
  return (
      //Defining navbar and Routes
    <>
    <UserContext.Provider value={{state,dispatch}}>
        
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Errorpage />} />
     
      </Routes>
    </UserContext.Provider>
    
    </>
  )
}
export default App





/*STEP-16 Create Registration Page UI using REACT | Signup Form in MERN STACK Project VIDEO NO-23 https://youtu.be/KM6_Eo1hj60 */
/*STEP-17 Create login Page UI using REACT | login Form in MERN STACK Project VIDEO NO-24 https://youtu.be/0lMSDl9Oq0c */
/*STEP-18 Create Contact us Page UI using REACT |  VIDEO NO-25 https://youtu.be/S8VfQUhbWFg */
/*STEP-19 Create Homepage  UI using REACT |  VIDEO NO-26 https://youtu.be/8aBfOaxA65U */
/*STEP-20 Create Aboutpage  UI using REACT |  VIDEO NO-27 https://youtu.be/kHEhhV3EyPU */
/*STEP-21 Create ERRORpage  UI using REACT |  VIDEO NO-28 https://youtu.be/h_O3k9A_X_k */


/*STEP-22 GET USER DATA IN FRONT-END CONSOLE | video no-30 https://youtu.be/KUF9-QAxjZc */

//code will be at signup.js
//first import this line to top
import React,{useState}from 'react'
//then type these codes
const Signup =()=>{
  const history = useNavigate();
  //setuser method will target it...
  const[user,setuser]=useState({
    name:"", email:"", work:"", phone:"", password:"", cpassword:""
  });
//BY THIS CODE IF ANY USER TYPES name,email,phone ,password,cpassword then it will be executed to console
  let name,value;
  const handleInputs =(e) =>{
    console.log(e);
    name = e.target.name;
    value=e.target.value;

    setuser({...user,[name]:value});
  }


//then type  value={user.name}  value={user.email}  value={user.password}  value={user.cpassword} value={user.work} to singup form for example:
<div className='form-group'>
                  <label htmlFor='email'>
                    <i class="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input type="email" name="email" id="email" autoComplete="off"
                  value={user.email}
                  placeholder='Your Email'/>
 </div>






/* STEP-23 Connect React with NodeJS & MongoDB | Stored Registration Form Data in Database in MERN VIDEO NO 31 https://youtu.be/Kvb0cHWFkdc */
//code will be at signup.js
import React,{useState}from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
//import signpic from "../images/man.png";

const Signup =()=>{
  const history = useNavigate();
  //setuser method will target it...
  const[user,setuser]=useState({
    name:"", email:"", work:"", phone:"", password:"", cpassword:""
  });
//BY THIS CODE IF ANY USER TYPES name,email,phone ,password,cpassword then it will be executed to console
  let name,value;
  const handleInputs =(e) =>{
    console.log(e);
    name = e.target.name;
    value=e.target.value;

    setuser({...user,[name]:value});
  }

//THIS CODE WILL PUSH DATA FROM FRONTEND TO DATABSE
const PostData = async (e) =>{
  e.preventDefault();
  const{ name, email, work, phone, password, cpassword} = user;
  
 const res = await fetch("/register",{
  method:"POST",
  headers:{
    "Content-Type" : "application/json"
  },
  body:JSON.stringify({   
    name, email, work, phone, password, cpassword
  })
 });

 const data = await res.json();

 if(data.status === 422 || !data){
   window.alert("invalid registration");
   console.log("invalid registration");
 }else{
  window.alert("Registration Successfull");
  console.log("Successfull Registration");

  history.pushState("/login");//after registration we will autometically goto login page
 }
}

//Also used onChange={handleInputs}, onClick={PostData} in signup form
//we also set a proxy server at package.json in this step


/*STEP-24 Implement Login System with JWT & Stored Cookie in MERN STACK VIDEO NO-33 https://youtu.be/gdV7CDJeVyo */
//to generate tokens for login the code is below written in login.js



//we have to import these lines
import React,{useContext,useState} from 'react';
import { NavLink ,useNavigate} from 'react-router-dom';
import { UserContext } from '../App';
const Login =()=>{
 const {state,dispatch} = useContext(UserContext);
 //THIS CODE WILL PUSH DATA FROM FRONTEND TO DATABSE & GENERATE TOKENS for login
  let navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const loginUser = async (e) => {
      e.preventDefault();

     const res = await  fetch('/signin',{
       method:"POST",
       headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({   
       email,  password
      })
     });

     const data = res.json();
     if(res.status === 400 || !data){
      window.alert("invalid Credencial");
      
    }else{
      dispatch({type:"USER",payload:true})
     window.alert("Singin Successfull");
    
   
     navigate("/");//after login successful it will take us to homepage
     }
  }
  //onChange={(e)=> setEmail(e.target.value)} used to get user value
  // onClick={loginUser} used to check truth of loginuser fetch arrow function.
  return (
    <>
     <section className="sign-in">
       <div className="container mt-5">
         <div className="singin-content">
            <div className="signin-form">
              <h2 className="form-tittle">Login</h2>
              <form method="POST" className='register-form' id='register-form'>
                

                <div className='form-group'>
                  <label htmlFor='email'>
                    <i class="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input type="email" name="email" id="email" autoComplete="off"
                   value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Your Email'/>
                </div>

                

                

                <div className='form-group'>
                  <label htmlFor='password'>
                    <i class="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input type="password" name="password" id="password" autoComplete="off"
                   value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Your password'/>
                </div>

                

                <div className='form-group form-button'>
                    <input type="submit" name="signup" id="signup" className="form-submit" 
                    value="Enter" onClick={loginUser}/>
                </div>
              </form>
      

                  <NavLink to="/signup" className="singup-image-link">Create an account</NavLink>
              
            </div>
         </div>
       </div>
     </section>  
    </>
  )
}
export default Login


/*========Step 25,26,27 is for about us page autjentication=====*/
//Step-25  User Authentication in MERN Stack Using JWT video 34 https://youtu.be/u19Qdq7fhTk

//Goto app.js of server side and delete middleware related codes..
//middleware
// const middleware =(req,res,next) =>{
//     console.log(`Hello my middleware`);
//     next();
// }

// app.get('/',(req,res) => {
//     res.send(`Hello world from server`);
// });

// app.get('/about',(req,res) => {
//     console.log(`Hello my about`);
//     res.send(`Hello about world from server`);
// });


//Create a folder named middle ware and create a file named authicate.js and write these codes....
//we need to require  jswebtoken and userschema file
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const Authenticate = async (req,res,next)=>{
try{
    const token = req.cookies.jwtoken; //we get the token
    const verifyToken = jwt.verify(token,process.env.SECRET_KEY);//verifying token with secret key

    const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token});//we are ensuring the user available or not
    if(!rootUser){
        throw new Error('User Not Found')
    }//if useris not matched throw error
    req.token = token;
    req.rootUser = rootUser;
    req.UserID = rootUser._id;
    next();
}catch(err){
    res.status(401).send('Unauthorized:No token provided');
    console.log(err);
}//if token doesn't match thorw this error
}

module.exports=Authenticate;


//Also write those below code line to auth.js file of server folder..
const authenticate = require("../middleware/authenticate");

//about us page
router.get('/about',authenticate,(req,res) => {
  console.log(`Hello my about`);
  res.send(req.rootUser);
});







/*STEP-26 ABOUT PAGE AUTHENTICATION Check User Login or Not | video no 35 https://youtu.be/tq880uEYc14 */


//goto server terminal and install cookie parser => npm i cookie-parser
//write this line to app.js 
const cookieParser = require("cookie-parser");
app.use(cookieParser()); //cookie parser helps to get cookie fronted to backend
//Now write below codes in About.js page this code will render user to about us page and in console we will find data of the user
import React, { useEffect } from 'react'
import hero from "../images/n.jpg"; 
import aboutpic from "../images/i.jpg";
import { useNavigate } from 'react-router-dom';
const About = () => {
  let navigate = useNavigate();
  const callAboutPage = async() => {
      try{
        const res = await fetch('/about',{
          method :"GET",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          credentials:"include"
        });
        const data = await res.json();
        console.log(data);
        if(!res.status === 200){
          const error = new Error(res.error);
          throw error;
          
        }

      }catch(err){
          console.log(err);
          navigate("/login");
      }
  }

  useEffect(() =>{
    callAboutPage();
  }, []);





/*STEP-27 Get About Us Page Data Dynamic After User Authentication video no 36 https://youtu.be/6U0vefhGGXA */

//update codes in about.js page
import React, { useEffect, useState } from 'react'
import hero from "../images/n.jpg"; 
import aboutpic from "../images/i.jpg";
import { useNavigate } from 'react-router-dom';
const About = () => {
  let navigate = useNavigate();
  const [userData,setUserData ] = useState({});//add this line 
  const callAboutPage = async() => {
      try{
        const res = await fetch('/about',{
          method :"GET",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          credentials:"include"
        });
        const data = await res.json();
        console.log(data);
        setUserData(data);//add this line
        if(!res.status === 200){
          const error = new Error(res.error);
          throw error;
          
        }

      }catch(err){
          console.log(err);
          navigate("/login");
      }
  }

  useEffect(() =>{
    callAboutPage();
  }, []);


//now in html side instate of hard code write  { userData.email },{userData.name},{userdata.work},{userData.phone} to make datas dynamically show in about us page from database.



/*STEP-28 Working Dynamic Home Page video no 39   https://youtu.be/qIoyq7C8OGs  */
//goto home.js and write these code
import React,{useState,useEffect} from 'react'
import signpic from "../images/im-unscreen.gif";
const Home =()=>{

  const [username,setUsername ] = useState('');
  const [show,setShow] = useState(false);

  const userHomePage = async() => {
      try{
        const res = await fetch('/getdata',{
          method :"GET",
          headers:{
            
            "Content-Type":"application/json"
          },
         
        });
        const data = await res.json();
        console.log(data);
        setUsername(data.name);
        setShow(true);
      }catch(err){
          console.log(err);
          
      }
  }

  useEffect(() =>{
    userHomePage();
  }, []);


  return (
    <>
    <div className='home-page'>
        <img src={signpic} alt="home-pic"/>
      <div className='home-div'>
        <h2 className='pt-5'>WELCOME TO BIOGENERATOR</h2>
        <h2>{username}</h2>
        <div className='marquee'>
        <h1>{show ? 'Happy to see you back': 'GENERATE YOUR BIO AND ENJOY THE WEBSITE'}</h1>
        </div>

      </div>
    </div>
     <div className='footer'>
        <p>All rights reserves to team LabRats</p>
        
     </div>
    </>
  )
}
export default Home







/*STEP 29 How to Implement Logout in MERN VIDEO 40 https://youtu.be/SY-NEr_bpEs */

//GOTO NAVBAR.JS and create logout menu in navbar
<li class="nav-item">
        <NavLink className="nav-link" to="/logout">Logout</NavLink>
 </li>


//now goto auth.js and create logout route
//logout page
router.get('/logout',(req,res) => {
  console.log(`Hello my logout`);
  res.clearCookie('jwtoken',{path:'/'});
  res.status(200).send('User logout');
});
module.exports = router;

//now in client side create logout.js page
import React, {useContext ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
const Logout =()=>{
    const {state,dispatch} = useContext(UserContext);
    let navigate = useNavigate();
    useEffect(()=>{
        fetch('/logout',{
            method:"GET",
            headers:{
                Accept:"aplication/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res)=>{
            dispatch({type:"USER",payload:false})
            navigate("/login");
            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err)=>{
            console.log(err);
        });
    });
  return (
    <>
    
    </>
  )
}
export default Logout
//Also mention logoutpage in App.js in client folder
import Logout from './components/Logout';
<Route path="/logout" element={<Logout />} />





/*STEP 30 How to Toggle Login Logout in Navbar in MERN VIDEO 41 https://youtu.be/fXk6x3MCNHM */
//goto App.js create context api and usereducer hooks
/* 
This is the main file of a React application that imports several dependencies and components to render a complete user interface.

The component imports several components from the project, such as Navbar, Home, About, Contact, Login, Signup, Errorpage, and Logout. It also imports the Routes and Route components from the react-router-dom library to define the navigation routes of the application.

The component defines a context using the createContext function and exports it as UserContext. The UserContext is used to manage the state of the application using the useReducer hook, which is initialized with an initial state and a reducer function defined in the UseReducer.js file.

The App component renders the UserContext.Provider component that wraps the Navbar component and the Routes component, which render the defined routes of the application. The UserContext.Provider component provides the state and dispatch values to all components that are nested inside it through the UserContext.

Finally, the component exports the App component to be used as the root component of the application.


*/

//imported several dependencies
import React, { createContext, useReducer } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import "./App.css";
import "./responsive.css";
//defining the navigation Routes of the application
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Errorpage from './components/Errorpage';
import Logout from './components/Logout';
import { initialState,reducer } from './reducer/UseReducer';

 //context api
export const UserContext = createContext();

const App =()=>{
 
  const [state,dispatch] = useReducer(reducer,initialState);
  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>

      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Errorpage />} />
     
      </Routes>
    </UserContext.Provider>
    
    </>
  )
}
export default App


//now create a folder called reducer in src client folder and create a file named usereducer.js and write down these code
export const initialState =null;
export const reducer = (state,action) =>{
    if(action.type === "USER"){
        return action.payload;
    }
    return state;
}


//goto login.js and write usecontext
import React,{useContext,useState} from 'react';
import { NavLink ,useNavigate} from 'react-router-dom';
import { UserContext } from '../App';
const Login =()=>{
 const {state,dispatch} = useContext(UserContext);//this code is for toggle login logout
 //THESE LINES OF CODES GENERATE TOKENS
  let navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const loginUser = async (e) => {
      e.preventDefault();

     const res = await  fetch('/signin',{
       method:"POST",
       headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({   
       email,  password
      })
     });

     const data = res.json();
     if(res.status === 400 || !data){
      window.alert("invalid Credencial");
      
    }else{
      dispatch({type:"USER",payload:true})//this code is for toggle login logout
     window.alert("Singin Successfull");
    
   
     navigate("/");
     }
  }



//goto logout.js and copy usecontext
//change dispatch value false below is the total code
import React, {useContext ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
const Logout =()=>{
    const {state,dispatch} = useContext(UserContext);//this line is copied from login.js
    let navigate = useNavigate();
    useEffect(()=>{
        fetch('/logout',{
            method:"GET",
            headers:{
                Accept:"aplication/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res)=>{
            dispatch({type:"USER",payload:false})//this line is copied from login.js
            navigate("/login");
            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err)=>{
            console.log(err);
        });
    });
  return (
    <>
    
    </>
  )
}
export default Logout



//Now goto navbar.js 

/*This code defines a functional React component called Navbar that renders a Bootstrap navigation bar based on the user's login status. It also imports the necessary dependencies such as React, useContext, NavLink, and logo.

The UserContext is imported from the App component and is used to retrieve the current user's login state, as well as to update it in the case of a logout action.

The component defines a nested functional component called RenderMenu, which returns a list of navigation links based on the user's login status. If the user is logged in (state is truthy), the component renders links to the home, about, contact, and logout pages. If the user is not logged in (state is falsy), the component renders links to the home, login, and registration pages.

Finally, the component returns the Bootstrap navigation bar markup that contains the app logo, a button that toggles the navigation menu, and the RenderMenu component. The navigation links are rendered conditionally based on the user's login status.
*/


//Importing necessary dependencies
import React,{useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import logo from "../images/logo_1.png";
import { UserContext } from '../App';

const Navbar =()=>{
  //The UserContext is imported from the App component and is used to retrieve the current user's login state, as well as to update it in the case of a logout action.
  const {state,dispatch} = useContext(UserContext);//this line is copied from login.js
  const RenderMenu = () =>{
    if(state){
      return(
        <>
        
        <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span class="sr-only">(current)</span></NavLink>
        </li>
      <li class="nav-item">
        <NavLink className="nav-link" to="/about">About</NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link" to="/contact">Contact</NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link" to="/logout">Logout</NavLink>
      </li>
        
        
        </>
      )
    }else{
      return (
        <>
            <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span class="sr-only">(current)</span></NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link" to="/login">Login</NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link" to="/signup">Registration</NavLink>
      </li>
      
        
        </>
      )
    }
  }
  return (
    <>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
 <NavLink className="navbar-brand" to="#">
     <span className='justDemo'><b>Biogenerator</b></span>
 </NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <RenderMenu/>
    </ul>
  </div>
</nav>
      
    </>
  )
}
export default Navbar



/*contact us page work*/
//goto about.js and copy function codes and paste it to contact.js

import React, { useEffect, useState } from 'react'
const Contact =()=>{
  const [userData,setUserData ] = useState({name:"",email:"",phone:"",message:""});
  const userContact = async() => {
      try{
        const res = await fetch('/getdata',{
          method :"GET",
          headers:{
            
            "Content-Type":"application/json"
          },
         
        });
        const data = await res.json();
        console.log(data);
        setUserData({ ...userData,name:data.name, email:data.email, phone:data.phone });

        if(!res.status === 200){
          const error = new Error(res.error);
          throw error;
          
        }

      }catch(err){
          console.log(err);
          
      }
  }

  useEffect(() =>{
    userContact();
  }, []);

//storing data in states
const handleInputs=(e) =>{
  const name = e.target.name;
  const value = e.target.value;
  setUserData({ ...userData,[name]:value });
}
 
//send data to backend
const contactForm = async (e) => {
  e.preventDefault();
  const {name,email,phone,message} = userData;
   const res = await fetch('/contact',{
    method :"POST",
    headers:{ 
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name,email,phone,message
    })
   });
   const data = await res.json();
   if(!data){
     console.log("message not send");
     
   }else{
     alert("Message Send");
     setUserData({ ...userData,message:"" });//with this line user data will be there but messege will be removed after sending
   }
}
  return (
    <>
      <div className='contact_info'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='contact_info_item '>
            <label htmlFor='password'>
                    <i class="zmdi zmdi-lock material-icons-name"></i>
                  </label>
              <div className='contact_info_content'>
                  
                <div className='contact_info-title'>
                  phone
                </div>
                <div className='contact_info-text'>
                  +987678950
                </div>
              </div>
            </div>

            <div className='contact_info_item'>
            <label htmlFor='password'>
                    <i class="zmdi zmdi-lock material-icons-name"></i>
                  </label>
              <div className='contact_info_content'>
                  
                <div className='contact_info-title'>
                  Email
                </div>
                <div className='contact_info-text'>
                  yoyorahib@gmail.com
                </div>
              </div>
            </div>

            <div className='contact_info_item '>
            <label htmlFor='password'>
                    <i class="zmdi zmdi-lock material-icons-name"></i>
                  </label>
              <div className='contact_info_content'>
                  
                <div className='contact_info-title'>
                  Address
                </div>
                <div className='contact_info-text'>
                  Mohini 160 lamapara,Sylhet
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


<div className='contact_us'>
     <div className='container-con'>
      <form method="POST" class="text-center border border-light p-5" action="#!">
        <p className="h4 mb-4">Get in touch</p>
        //with the help of value={ userData.name } value={ userData.phone } value={ userData.email } we get user data for contactus page form.
        <input type="text" id="defaultContactFormName" className="form-control mb-4"  name="name" value={ userData.name } onChange={handleInputs} placeholder="Name"/>
        <input type="number" id="defaultContactFormName" className="form-control mb-4"  name="phone" value={ userData.phone } onChange={handleInputs} placeholder="phonenumber"/>
        <input type="email" id="defaultContactFormEmail" className="form-control mb-4"  name="email" value={ userData.email } onChange={handleInputs} placeholder="E-mail"/>
        <div className="form-group">
            <textarea className="form-control rounded-0" id="exampleFormControlTextarea2" rows="3" name="message" value={ userData.message } onChange={handleInputs} placeholder="Message"></textarea>
        </div>
        <button className="btn btn-info btn-block" type="submit" onClick={contactForm}>Send</button>

      </form>
    </div>
</div>
    </>
  )
}
export default Contact


//goto auth.js and write these codes
//get user data for contactus and homepage
router.get('/getdata',authenticate,(req,res) =>{
  console.log(`Hello my about`);
  res.send(req.rootUser);//with the help of this line users  data(id,email,phone) get to console
});



//goto auth.js
//contact us page
router.post('/contact',authenticate,async(req,res) => {
  try{
    const {name,email,phone,message} = req.body;
    if(!name || !email || !phone || !message){
       console.log("Error in contact form");
       return res.json({error:"Please fill the contact form"});
    }

    const userContact = await User.findOne({ _id: req.userID });

    if(userContact){
        const userMessage = await userContact.addMessage(name,email,phone,message);
        await userContact.save();
        res.status(201).json({ message:"user contact successfuly" });
    }

  }catch(error){
       console.log(error);
  }
  
});


//goto userSchema.js and create a messege schema
messages:[
  {
      name:{
          type:String,
          required:true   
      }, 
      email: {
          type:String,
          required:true
      }, 
      phone: {
          type:String,
          required:true
      },
      message: {
       type:String,
       required:true
      }
  }
]


//write these codes in userscshema.js
//storred the message
userSchema.methods.addMessage = async function (name,email,phone,message){
    try{
        this.messages = this.messages.concat({name,email,phone,message});
        await this.save();
        return this.messages;
    }catch(error){
        console.log(error)
    }
}





















































































































