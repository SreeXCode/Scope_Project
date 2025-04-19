import React from "react";
import '../styles/Footer.css';

const FooterHomeAndLogin = () => {
  return (
    <>
    {/*BLUE TEXT FOOTER*/}
    <footer id="FooterID" className="FooterClass container-fluid py-5">
      <div className="container-xxl text-center">
        <div className="row">
          <div className="col-12 col-md-4 mt-5 txtoffirstthree">
            <p>
              <span className="number-large fs-2 fw-bold">1000+</span><br />
              <span className="fs-5 fw-bold text-white">STUDENTS ARE</span> <br />
              <span className="fs-5 fw-bold text-white">TRAINED EVERY YEAR</span>
            </p>
          </div>

          <div className="col-12 col-md-4 mt-1 txtoffirstthree">
            <p>
              <span className="number-large fs-2 fw-bold">30+</span> <br />
              <span className="fs-5 fw-bold text-white">COMPUTER COURSES</span>
            </p>
          </div>

          <div className="col-12 col-md-4 mt-5 txtoffirstthree">
            <p>
              <span className="number-large fs-2 fw-bold">95%</span> <br />
              <span className="fs-5 fw-bold text-white">STUDENTS ARE GETTING</span> <br />
              <span className="fs-5 fw-bold text-white">PLACED EVERY YEAR</span>
            </p>
          </div>
        </div>

        {/* Logo and Footer Info */}
        <div className="mt-5">
          <img src="/images/snowparkFooterLogo.png" className="img-fluid" alt="Centered Image" />
        </div>

        <div className="text-white text-center mt-3">
          <p>Center for Software, Networking, & Cloud Education</p>
          <p>Kerala: Technopark TVM | Thampanoor TVM | Kochi, Kerala | Nagercoil, Tamil Nadu</p>
        </div>

        {/* ISO Logo and info */}
        <div className="">
          <img src="/images/isoIafLogo.png" className="img-fluid mt-3" alt="Centered Image"
            style={{ width: "400px", height: "auto" }} />
        </div>

        <div className="text-white mt-2">
          <p>An ISO 9001:2015 Certified Company</p>
        </div>

        <div className="text-white">
          <p>All Rights Reserved Suffix E Solutions &copy; 2007-2025  </p>
        </div>

        <div className="text-white text-center mt-3">
          <p>
            <a href="tel:+919745936073" className="text-white text-decoration-none d-block d-md-inline mx-4">9745936073 (TPK)</a>
            <a href="tel:+919745936073" className="text-white text-decoration-none d-block d-md-inline mx-4">9745936073 (TVM)</a>
            <a href="tel:+919745936073" className="text-white text-decoration-none d-block d-md-inline mx-4">9745936073 (EKM)</a>
            <a href="tel:+919745936073" className="text-white text-decoration-none d-block d-md-inline mx-4">9745936073 (NGL)</a>
            <a href="mailto:info@scopeindia.org" className="text-white text-decoration-none d-block d-md-inline mx-4">info@scopeindia.org</a>
          </p>
        </div>




      </div>
    </footer>
    </>
  );
};

export default FooterHomeAndLogin;
