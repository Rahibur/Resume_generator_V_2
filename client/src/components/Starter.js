import React, { useState, useEffect } from 'react'
import signpic from "../images/im-unscreen.gif";//imported gif
import Navbar from './Layout/Navbar';

const Home = () => {




  return (
    <>
    <Navbar/>
      <div className='home-page'>
        <img src={signpic} alt="home-pic" />
        <div className='home-div'>
          <h2 className='pt-5'>WELCOME TO RESUME BUILDER</h2>

          <div className='marquee'>
            <h1>GENERATE YOUR RESUME AND ENJOY THE WEBSITE</h1>
          </div>

        </div>
      </div>
      
      <div className='container'>
        <marquee scrollamount="10" direction="right">
          <div className='row'>
            <div className='col-md-4'>
              <div className='element_10'>

              </div>
            </div>
            <div className='col-md-4'>
              <div className='element_22'>

              </div>
            </div>
            <div className='col-md-4'>
              <div className='element_33'>

              </div>
            </div>

            
            

          </div>

          </marquee>
      </div>

      <div className='container'>
        <div className='row '>
          <div className='col-md-8'>
            <div className='about'>
              <h2>About the site</h2>
              <p>In This site you can make  a good fantasting looking resume. users can choose from a range of pre-designed templates and customize their resume with their own information, skills, and experience. The app also offers useful tips and suggestions for creating a strong resume that stands out to potential employers</p>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='img_2'>
            </div>
          </div>
        </div>

      </div>

      <div className='container'>
        <div className='row '>
          <div className='col-md-4'>
            <div className='img_3'>

            </div>
          </div>
          <div className='col-md-8'>
            <div className='about_2'>
              <h2>Send us email</h2>
              <p>Sending an email is the act of composing, transmitting, and receiving electronic messages between two or more users.</p>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='row '>
          <div className='col-md-4'>
            <div class="embed-responsive embed-responsive-4by3">
              <iframe class="embed-responsive-item" src="https://drive.google.com/file/d/1JUAFnoAmutaZti0lTsXCEiTO3pO0S4Z2/preview" width="740" height="380" allowfullscreen></iframe>
            </div>
          </div>

          <div className='col-md-8'>
            <div className='about_3'>
              <h2>Watch our video </h2>
              <p>Sending an email is the act of composing, transmitting, and receiving electronic messages between two or more users.</p>
            </div>
          </div>
        </div>
      </div>


      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <h5>About Us</h5>
              <p>We are a team of developers who love to create amazing websites and web applications.</p>
            </div>
            <div className="col-md-6 col-lg-4">
              <h5>Contact Us</h5>
              <p>123 Main St, Anytown USA 12345</p>
              <p>Phone: 555-555-5555</p>
              <p>Email: info@yourwebsite.com</p>
            </div>
            <div className="col-lg-4">
              <h5>Follow Us</h5>
              <ul className="social-media">
                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                <li><a href="#"><i className="fab fa-instagram"></i></a></li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <p>&copy; 2023 Your Website. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}
export default Home