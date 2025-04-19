import React from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.css'

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top">
        <div className="container-fluid">

          {/* Toggle Button (opens menu on right) */}
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
          >
            <span className="navbar-toggler-icon "> </span>
          </button>

          {/* Regular Navbar for Large Screens */}
          <div className="container collapse navbar-collapse d-none d-lg-block">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item "><a className="nav-link text-warning font-size" href="/"  style={{marginLeft:"50px"}}>Home</a></li>
              <li className="nav-item"><a className="nav-link font-size" href="/Courses" style={{ position: "relative", right: "40px" }}>Courses</a></li>
              <li className="nav-item"><a className="nav-link font-size" href="/AdminLogin" style={{ position: "relative", right: "80px" }}>Admin Cell</a></li>

              <li className="nav-item">
                <Link className="nav-link" to="/Login">
                  <img
                    src="/images/scopeIndiaLogoBird.png"
                    style={{ width: "35px", height: "auto", position: "relative", left: "50px" }}
                    className="img-fluid"
                    alt="Centered Image"
                  />
                </Link>
              </li>

              <li className="nav-item"><a className="nav-link font-size" href="/About" style={{ position: "relative", left: "80px" }}>About Us</a></li>
              <li className="nav-item"><a className="nav-link font-size" href="/Contact" style={{ position: "relative", left: "40px" }}>Contact Us</a></li>
              <Link to="/register">
                <li className="nav-item"><button style={{ height: "35px", width: "120px", position:'relative',left:"12px"}}
                  className="Register-btn font-size">Register Now</button></li>
              </Link>
              <Link to="/SignInGenOtp">
                <li className="nav-item"><button style={{ height: "35px", width: "100px", position:"relative", }}
                  className="Register-btn font-size">SignIn</button></li>
              </Link>

            </ul>
          </div>
        </div>
      </nav>

      {/* Offcanvas (Right Side Mobile Menu) */}
      <div
        className="offcanvas offcanvas-end bg-dark text-white"
        tabIndex="-1"
        id="offcanvasNavbar"
        data-bs-scroll="true"
        data-bs-backdrop="false"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item"><a className="nav-link text-white" href="#">Home</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#">About</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#">Services</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#">Portfolio</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#">Contact</a></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
