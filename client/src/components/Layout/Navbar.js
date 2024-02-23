//Navbar contains the menubar of the application
//imported 
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import logo from './logo.png';

const Navbar = () => {
  const [loginUser, setLoginUser] = useState('');
  const navigate = useNavigate();
  // display login user name
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setLoginUser(user)
    }
  }, [])
  // logout functionality
  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success('You are logged out');
    navigate('/login')
  }
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light" >
        <div className="container-fluid">

          <NavLink className="navbar-brand" to="/"><img src={logo} alt="home-pic" style={{ width: '219px', height: '70px' }} /></NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto mb-5 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">Build Resume</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/starter">About Section</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/connect">Contact us</NavLink>
              </li>
              <div className="loginuser_logout_btn">
                <li className="nav-item">
                  <p className="nav-link user_name">{loginUser && loginUser.name}</p>
                </li>
                <li className="nav-item">
                  <button className="btn log_btn btn-primary"
                    onClick={logoutHandler}>
                    Logout
                  </button>
                </li>
              </div>

            </ul>

          </div>

        </div>
      </nav>
    </header>

  )
}

export default Navbar