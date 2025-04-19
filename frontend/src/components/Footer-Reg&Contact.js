import React from "react";
import '../styles/Footer.css';

const FooterRegisterAndContact = () => {
  return (
    <>
    {/*NORMAL FOOTER*/}
    <footer id="FooterID" className="FooterClass container-fluid py-5">
      <div className="container-xxl text-center">
        

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

export default FooterRegisterAndContact;
