// App.js is responsible for routing all the pages



import './App.css';//Routing css file
import "./responsive.css";
//Routing Navbar file, Home file, Register + Edit file,details file

import Home from './components/Home';
import Register from './components/Register';
import Edit from './components/Edit';
import Details from './components/Details';
import UserRegister from './components/UserRegister';
import Starter from './components/Starter';
import Connect from './components/Connect';
import { Route, Routes,Navigate } from "react-router-dom"//Defining Route and Routes react components
import Login from './components/Login';
import Details_Two from './components/Details_Two';
import Details_Three from './components/Details_Three';








function App() {


  return (
    //Defining navbar and Routes
    <>

    
      <Routes>
        <Route path='/' element={<ProtectedRoutes><Home /></ProtectedRoutes>}/>
        <Route exact path="/starter" element={<Starter />} />
        <Route  path="/connect" element={<Connect />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/edit/:id" element={<Edit />} />
        <Route exact path="/view/:id" element={<Details />} />
        <Route exact path="/view_1/:id" element={<Details_Two />} />
        <Route exact path="/view_2/:id" element={<Details_Three />} />
         <Route path='/reguser' element={<UserRegister/>}/>
         <Route path='/login' element={<Login/>}/>
      </Routes>


    </>
  );
  
}
export function ProtectedRoutes(props){
  if(localStorage.getItem('user')){
    return props.children
  }else{
    return <Navigate to ="/login" />;
  }
}
export default App;