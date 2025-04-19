import React from 'react';
import Navbar from '../components/Header';
import Footer from '../components/Footer-Home&Login';
import '../styles/Home.css';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className='container-fluid m-0 p-0'>

        <div className="container-fluid m-0 p-0 Home-logo-bg">
          {/*Scope Home Logo*/}
          <div className="container text-center" style={{ marginTop: "310px", marginBottom: "310px" }}>
            <img
              src="/images/homeScopeimg.png"
              className="img-fluid container"
              alt="Centered Image"
              style={{ width: "650px", height: "200px", objectFit: "contain" }}
            />
          </div>


        </div>


        {/* Carousel Background Orange */}
        <div className="container-fluid m-0 p-0" style={{ backgroundColor: "rgb(4,28,93)", height: "900px", position: "relative" }}>
          <div id="carouselExample" className="carousel slide container d-flex justify-content-center align-items-center " data-bs-ride="carousel">
            {/* Indicators */}
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active"></button>
              <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
              <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"></button>
            </div>

            {/* Carousel Items */}
            <div className="carousel-inner mt-3"  >
              <div className="carousel-item active">
                <a href="/images/homeSlide1.jpg" target="_blank">
                  <img src="/images/homeSlide1.jpg" className="d-block img-fluid mx-auto" alt="Slide 1" />
                </a>
              </div>
              <div className="carousel-item">
                <a href="/images/homeSlide2.jpg" target="_blank">
                  <img src="/images/homeSlide2.jpg" className="d-block img-fluid mx-auto" alt="Slide 2" />
                </a>
              </div>
              <div className="carousel-item">
                <a href="/images/homeSlide3.jpg" target="_blank">
                  <img src="/images/homeSlide3.jpg" className="d-block img-fluid mx-auto" alt="Slide 3" />
                </a>
              </div>
            </div>


            {/* Previous and Next Buttons */}
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>


          {/* Child Image fixed at the bottom */}
          <img
            src="/images/snowSprinkles.png"
            className="img-fluid"
            alt="Centered Image"
            style={{
              width: "100%", // Ensures image spans full width
              height: "auto", // Maintains aspect ratio
              position: "absolute", // Fix the image to the bottom
              bottom: "0", // Position it at the bottom of the parent
              left: "0", // Stretch from the left to the right
            }}
          />
        </div>





        {/* BACKGROUND WHITE Shorts Video Container*/}
        <div className="container bg-white" >


          <div
            className="container-fluid d-flex align-items-center justify-content-center"
            style={{
              backgroundImage: "url('/images/contactBg2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "repeat",
              height: "auto", // Fixed height
              width: "1050px", // Fixed width
              maxWidth: "100%", // Ensures responsiveness
              position: "relative",
              bottom: "120px"
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
                    <div className='' style={{
                      border: "9px solid black",
                      height: "498px"
                    }}>
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
                </div>

                {/* Second Column (Form & Buttons) */}
                <div className="col-12 col-md-6 d-flex flex-column align-items-center text-center text-md-start" >
                  <div className=' threeinside' style={{ position: "relative", right: "30px" }}>

                    <div className="container-fluid ">
                      <h2 className="fw-bold INDIAA"> SCOPE INDIA </h2>
                      <p className="fw-light is-open" style={{ marginBottom: "60px" }}>is open 365 days a year</p>
                    </div>

                    <div className='container-fluid' style={{ position: "relative", bottom: "25px" }}>
                      <p className='we-are'>We are open 7 days 24 hrs to talk to you and listen to your queries.</p>
                    </div>

                  </div>

                  <h1 className="callme text-center text-md-start fw-bold fs-3 fs-sm-5">
                    GET FREE A CALL BACK
                  </h1>

                  <div className=''>
                    <input type="text" className="input-box form-control mt-3" placeholder="Enter your name" />
                    <input type="text" className="input-box form-control mt-3" placeholder="Enter your phone no." />
                  </div>

                  <div className=''>
                    {/* Call Me Button */}
                    <div className="col-12 col-md-10 mt-3">
                      <button className="callme-button ">
                        <a href="#" className="text-decoration-none callme-button" style={{ color: "white" }}>
                          Call Me
                        </a>
                      </button>
                    </div>
                  </div>

                </div>



              </div>
            </div>
          </div>

          {/* Five Star Portion */}

          <div className="text-center" style={{ position: "relative", bottom: "50px" }}>
            <img src="/images/fivestar.png" className="img-fluid mt-3" alt="Centered jpg" style={{ width: "380px", height: "auto" }} />
          </div>
          <p className="text-center fiveStar-txt" style={{ position: "relative", bottom: "23px" }}>Google 4.9 ★ Rated Institute</p>

          {/*Scope india Your Career partner*/}


          <h1 className='text-center  SCOPE-HEADING'>
            SCOPE INDIA, your career partner!
          </h1>

          <div className=''>
            <h2 className="text-center oneOFF">
              One of India's best Training destinations for Software, Networking,
              <br />
              and Cloud Computing courses with 17 years of Industrial
              <br />
              experience.
            </h2>
          </div>

          <div className="container-fluid px-3 px-md-2 px-lg-1 pt-2 mt-2">
            <p className="paragrap">
              <strong>Software, Networking, and Cloud Professional Education Centre</strong> in Kerala and Tamil Nadu from
              <strong>Suffix E Solutions</strong> with a WORKING PROFESSIONALS oriented on-the-job TRAINING model.
              SCOPE INDIA provides courses for <strong>Software Programming</strong> in Python (Data Science | Artificial Intelligence |
              Machine Learning | Deep Learning, Data Analytics), Java, PHP, .Net, MERN, <strong>Software Testing</strong> (Manual and Automation),
              <strong>Cloud Computing</strong> (AWS | Azure), <strong>Server Administration</strong> (Microsoft MCSE | Linux RHCE), Networking (CCNA),
              <strong>DevOps</strong>, <strong>Mobile App Development</strong> in Flutter, and <strong>Digital Marketing</strong>.
              A Training with a 100% Trusted Job-Based Internship Model. SCOPE INDIA has a Strong Placement Cell that provides
              jobs to thousands of students annually. We assure you, you won't regret it after training from SCOPE INDIA!
            </p>
          </div>

          <div className="container-fluid px-3 px-md-2 px-lg-1">
            <p className="paragrap">
              This is how SCOPE INDIA can support both newbies and those experienced in the industry to upgrade their skills.
            </p>
          </div>

          {/*Four Buttons*/}
          <div class="container-fluid text-center mt-5">
            <div class="row justify-content-center">
              {/* Small screens: Full width (col-12) Medium & larger: 6-column width */}
              <div class="col-12 col-md-10 ">
                <a href="#" class="btn w-100 mb-4 p-3 Three-Button btn-custom1">Recent Placements</a>
              </div>
              <div class="col-12 col-md-10 ">
                <a href="#" class="btn w-100 mb-4 p-3 Three-Button  btn-custom2" >Courses</a>
              </div>
              <div class="col-12 col-md-10 ">
                <a href="#" class="btn w-100 mb-4 p-3 Three-Button btn-custom3">Register Now!</a>
              </div>
              <div class="col-12 col-md-10 ">
                <a href="#" class="btn w-100 mb-4 p-3 Three-Button btn-custom3">🔳 Chat on WhatsApp</a>
              </div>
            </div>
          </div>


          {/* Last 4 Icons */}
<div className="container-fluid" style={{ marginTop: "80px", marginBottom: "100px" }}>
  <div className="row text-center">
    <div className="col-12 col-md-3 d-flex flex-column align-items-center mb-4">
      <img src="/images/homeIcon1.png" alt="Icon 1" className="img-fluidz" style={{ height: "70px" }} />
      <h1 className="four-icon-heading mt-2">Training</h1>
      <p className="four-icon-heading-para">
        You are trained under Suffix E Solutions working professionals, on-the-job training model.
      </p>
    </div>
    <div className="col-12 col-md-3 d-flex flex-column align-items-center mb-4">
      <img src="/images/homeIcon2.png" alt="Icon 2" className="img-fluid" style={{ height: "70px" }} />
      <h1 className="four-icon-heading mt-2">Internship</h1>
      <p className="four-icon-heading-para">
        After course completion, you will be proceeded to live projects with a 6 months experience certificate.
      </p>
    </div>
    <div className="col-12 col-md-3 d-flex flex-column align-items-center mb-4">
      <img src="/images/homeIcon3.png" alt="Icon 3" className="img-fluid" style={{ height: "70px" }} />
      <h1 className="four-icon-heading mt-2">Grooming</h1>
      <p className="four-icon-heading-para">
        CV Preparation, Interview Preparation, and Personality Development.
      </p>
    </div>
    <div className="col-12 col-md-3 d-flex flex-column align-items-center mb-4">
      <img src="/images/homeIcon4.png" alt="Icon 4" className="img-fluid" style={{ height: "70px" }} />
      <h1 className="four-icon-heading mt-2">Placement</h1>
      <p className="four-icon-heading-para">
        Gives 100% FREE placement support to all our fellow techies through SCOPE INDIA's Placement Cell.
      </p>
    </div>
  </div>
</div>






        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;