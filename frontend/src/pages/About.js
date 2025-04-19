import React from 'react';
import '../styles/About.css'; // Ensure you create this CSS file
import Header from '../components/Header';
import FooterCourseAndAbout from '../components/Footer-Course&About';

const About = () => {
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
            One of India's best Training destinations for Software, Networking, <br className="d-none d-md-block" />
            and Cloud Computing courses with 17 years of Industrial <br className="d-none d-md-block" />
            <span className="">experience.</span>
          </h2>


          <div class="container-fluid px-3 px-md-2 px-lg-1 pt-2">
            <p class="paragraph">
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

          <div class="container-fluid px-3 px-md-2 px-lg-1">
            <p class="paragraph">
              This is how SCOPE INDIA can support both newbies and those experienced in the industry to upgrade their skills.
            </p>
          </div>



          <div className="text-center">
            <img src="/images/fivestar.png" className="img-fluid mt-3" alt="Centered Image"
              style={{ width: "300px", height: "auto" }} />
          </div>


          <p class="text-center five-star-dis mt-2">Google 4.9 * Rated Institute</p>

          <div class="container-fluid text-center mt-4">
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
            </div>
          </div>

        </div>

      </div>
     
      <FooterCourseAndAbout/>
    </>

  );
}

export default About;
