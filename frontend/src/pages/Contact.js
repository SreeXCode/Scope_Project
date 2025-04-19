import React from 'react';
import Header from '../components/Header';
import '../styles/contact.css'
import FooterRegisterAndContact from '../components/Footer-Reg&Contact';
const ContactUs = () => {

  return (
    <>
      <Header />

      <div className="container-fluid m-0 p-0">

        <div
          className="bg-image"
          style={{
            backgroundImage: "url('/images/snowpark-skis-headerbg2.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "repeat",
            minHeight: "100vh", // Ensures full height on all screens
            width: "100%", // Responsive width
            backgroundAttachment: "fixed",

          }}>

          <h1 className='text-center SCOPE-INDIA-HEADING'>
            SCOPE INDIA, your career partner!
          </h1>

          <h2 className="text-center px-3 px-md-5 container-fluid OneofIndia">
            Let's discuss your career, 24/7 free Consultation
          </h2>

          <div className="text-center">
            <img src="/images/fivestar.png" className="img-fluid mt-3" alt="Centered jpg"
              style={{ width: "300px", height: "auto" }} />
          </div>
          <p class="text-center five-star-dis mt-2">Google 4.9 * Rated Institute</p>



          <div
            className="container-fluid d-flex align-items-center justify-content-center"
            style={{
              backgroundImage: "url('/images/contactBg2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "repeat",
              height: "auto", // Fixed height
              width: "1050px", // Fixed width
              maxWidth: "100%" // Ensures responsiveness
            }}
          >
            <div className="container " style={{ padding: "50px", paddingBottom: "90px" }}>
              <div className="row d-flex flex-column flex-md-row align-items-center">
                {/* First Column (Video Section) */}
                <div className="col-12 col-md-6 d-flex justify-content-center mb-4 mb-md-0">
                  <div
                    className="rounded shadow"
                    style={{
                      height: "480px",
                      width: "400px", // Fixed width
                      backgroundColor: "black"
                    }}
                  >
                    <div
                      style={{
                        border: "7px solid white",
                        height: "480px"
                      }}
                    >
                      <iframe
                        width="100%" // Responsive width
                        height="100%"
                        src="https://www.youtube.com/embed/eIFj4nYNYbw?si=ipQskYw9FKzhxl3G"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>

                {/* Second Column (Form & Buttons) */}
                <div className="col-12 col-md-6 d-flex flex-column align-items-center text-center text-md-start" >
                  <h1 className="callme text-center text-md-start fw-bold fs-3 fs-sm-5">
                    GET FREE A CALL BACK
                  </h1>



                  <input type="text" className="input-box form-control mt-3" placeholder="Enter your name" />
                  <input type="text" className="input-box form-control mt-3" placeholder="Enter your phone no." />



                  <div className=''>

                    {/* Call Me Button */}
                    <div className="col-12 col-md-10 mt-3">
                      <button className="callme-button ">
                        <a href="#" className="text-decoration-none callme-button" style={{ color: "white" }}>
                          Call Me
                        </a>
                      </button>
                    </div>

                    {/* Links Section */}
                    <div className="col-12 col-md-10 mt-4">
                      <a href="#" className="btn mb-4 p-3 b1 ">Recent Placements</a>
                    </div>
                    <div className="col-12 col-md-10">
                      <a href="#" className="btn mb-4 p-3 b2 ">Courses</a>
                    </div>
                    <div className="col-12 col-md-10">
                      <a href="#" className="btn mb-4 p-3 b3 ">Register Now!</a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>


        {/*Location Section*/}
        <div className="d-flex" style={{ backgroundColor: "rgb(4,28,93)" }} >
          <div className="container">

            <div className="container Locations">
              <h2 className="pt-5" style={{ fontSize: "40px" }}>Locations</h2>
            </div>



            <div className="row justify-content-center gap-3">
              <div className="col-md-5 col-12  p-4  mx-md-2 mb-3 colu ">
                {/*Location 1*/}
                <ul className='list-unstyled p-3'>
                  <p className='heading'>Technopark TVM, Kerala</p>
                  <li className='loc bi bi-geo-alt-fill '> Phase 1, Main Gate, Diamond Arcade, Near Technopark, Trivandrum</li>
                  <li className='loc bi bi-telephone-fill pt-1'> 9745936073</li>
                  <li className='loc bi bi-envelope-fill pt-1 t'>
                    <a href="mailto:technopark@scopeindia.org" className='text-light text-decoration-none ms-1'>technopark@scopeindia.org</a>
                  </li>
                  <li className='loc bi bi-link-45deg pt-1'>
                    <a href="https://www.scopeindia.org" target="_blank" rel="noopener noreferrer" className='text-light text-decoration-none ms-1'>
                      www.scopeindia.org
                    </a>
                  </li>
                  <li className='loc bi bi-map pt-1'>
                    <a
                      href="https://maps.app.goo.gl/MtFiVeKw7EaYmG817"
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-light text-decoration-none ms-1'
                    >
                      Location Route Map
                    </a>
                  </li>


                </ul>
              </div>
              <div className="col-md-5 col-12  p-4 mx-md-2 mb-3 colu">
                   {/*Location 2*/}
                <ul className='list-unstyled p-3'>
                  <p className='heading'>Thampanoor TVM, Kerala</p>
                  <li className='loc bi bi-geo-alt-fill '> TC 25/1403/3, Athens Plaza, SS Kovil Road, Thampanoor, Trivandrum, Kerala 695001</li>
                  <li className='loc bi bi-telephone-fill pt-1'> 9745936073</li>
                  <li className='loc bi bi-envelope-fill pt-1'>
                    <a href="mailto:info@scopeindia.org" className='text-light text-decoration-none ms-1'>
                      info@scopeindia.org
                    </a>
                  </li>
                  <li className='loc bi bi-link-45deg pt-1'>
                    <a
                      href="https://www.scopeindia.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-light text-decoration-none ms-1'
                    >
                      www.scopeindia.org
                    </a>
                  </li>
                  <li className='loc bi bi-map pt-1'>
                    <a
                      href="https://maps.app.goo.gl/tQy5QJnTXAEwgu92A"
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-light text-decoration-none ms-1'
                    >
                      Location Route Map
                    </a>
                  </li>

                </ul>
              </div>
            </div>

            <div className="row justify-content-center gap-3 mt-2">
              <div className="col-md-5 col-12  p-4  mx-md-2 mb-3 colu ">
                   {/*Location 3*/}
                <ul className='list-unstyled p-3'>
                  <p className='heading'>Kochi, Kerala</p>
                  <li className='loc bi bi-geo-alt-fill '> SCOPE INDIA, Vasanth Nagar Rd, near JLN Metro Station, Kaloor, Kochi, Kerala 682025</li>
                  <li className='loc bi bi-telephone-fill pt-1'>7592939481</li>
                  <li className='loc bi bi-envelope-fill pt-1'>
                    <a href="mailto:kochi@scopeindia.org" className='text-light text-decoration-none ms-1'>
                      kochi@scopeindia.org
                    </a>
                  </li>
                  <li className='loc bi bi-link-45deg pt-1'>
                    <a
                      href="https://www.scopeindia.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-light text-decoration-none ms-1'
                    >
                      www.scopeindia.org
                    </a>
                  </li>
                  <li className='loc bi bi-map pt-1'>
                    <a
                      href="https://maps.app.goo.gl/dwCpSWFugfQMMTNk7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-light text-decoration-none ms-1'
                    >
                      Location Route Map
                    </a>
                  </li>

                </ul>
              </div>
              <div className="col-md-5 col-12  p-4 mx-md-2 mb-3 colu">
                   {/*Location 4*/}
                <ul className='list-unstyled p-3'>
                  <p className='heading'>Nagercoil, Tamil Nadu</p>
                  <li className='loc bi bi-geo-alt-fill '> SCOPE INDIA, Near WCC College, Palace Rd, Nagercoil, Tamil Nadu 629001</li>
                  <li className='loc bi bi-telephone-fill pt-1'> 8075536185</li>
                  <li className='loc bi bi-envelope-fill pt-1'>
                    <a href="mailto:ngl@scopeindia.org" className='text-light text-decoration-none ms-1'>
                      ngl@scopeindia.org
                    </a>
                  </li>
                  <li className='loc bi bi-link-45deg pt-1'>
                    <a
                      href="https://www.scopeindia.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-light text-decoration-none ms-1'
                    >
                      www.scopeindia.org
                    </a>
                  </li>
                  <li className='loc bi bi-map pt-1'>
                    <a
                      href="https://maps.app.goo.gl/D34D8YB8ho9naEtf8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-light text-decoration-none ms-1'
                    >
                      Location Route Map
                    </a>
                  </li>

                </ul>
              </div>
            </div>

            <div className="row justify-content-center gap-3 mt-2">
                 {/*Location 5*/}
              <div className="col-md-5 col-12  p-4  mx-md-2 mb-3 colu ">
                <ul className='list-unstyled p-3'>
                  <p className='heading'>Nagercoil, Tamil Nadu</p>
                  <li className='loc bi bi-geo-alt-fill '> SCOPE INDIA, Pharma Street, 5/2 Ward 28, Distillery Road, Putheri Nagercoil (Near WCC Jn)</li>
                  <li className='loc bi bi-telephone-fill pt-1'> 8075536185</li>
                  <li className='loc bi bi-envelope-fill pt-1'>
                    <a href="mailto:ngl@scopeindia.org" className='text-light text-decoration-none ms-1'>
                      ngl@scopeindia.org
                    </a>
                  </li>
                  <li className='loc bi bi-link-45deg pt-1'>
                    <a
                      href="https://www.scopeindia.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-light text-decoration-none ms-1'
                    >
                      www.scopeindia.org
                    </a>
                  </li>
                  <li className='loc bi bi-map pt-1'>
                    <a
                      href="https://maps.app.goo.gl/29GtbamdPtus8ADUA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-light text-decoration-none ms-1'
                    >
                      Location Route Map
                    </a>
                  </li>

                </ul>
              </div>
            </div>





          </div>
        </div>
        {/* Child Image fixed at the bottom */}
        <div className="container-fluid p-0 m-0">
          <img
            src="/images/snowSprinkles.png"
            className="img-fluid full-width-img"
            alt="Full-Width Image"
            style={{ backgroundColor: "rgb(4,28,93)" }}
          />
        </div>



      </div>
      <FooterRegisterAndContact />
    </>
  );
};

export default ContactUs;
