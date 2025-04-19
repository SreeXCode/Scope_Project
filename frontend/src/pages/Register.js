import { useState, useEffect ,useRef} from "react";
import axios from "axios";
import Header from "../components/Header";
import '../styles/Register.css';
import FooterRegisterAndContact from "../components/Footer-Reg&Contact";

const Register = () => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    educationalQualification: "",
    mobileNumber: "",
    email: "",
    guardiansName: "",
    guardiansOccupation: "",
    guardiansMobile: "",
    trainingMode: "",
    scopeIndiaLocation: "",
    preferredTrainingTimings: [],
    address: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
    courses: "",
    profilePicture: null,
  });

  const trainingModes = ['Live Online', 'Class Room'];
  const locations = ['Technopark TVM', 'Thampanoor TVM', 'Kochi', 'Nagercoil', 'Online'];
  const timings = ['Between 8am - 10am', 'Between 9am - 1pm', 'Between 1pm - 6pm', 'Between 6pm - 10pm'];

  const [courses, setCourses] = useState([]);
  console.log("courses", courses)
  console.log('formData', formData)

  useEffect(() => {
    axios.get("http://localhost:5000/courses")
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          console.log(response.data.data)
          setCourses(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setCourses([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setCourses([]);
      });
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "courses") {
      // Find the selected course by _id
      const selectedCourse = courses
        .flatMap((category) => category.courses)
        .find((course) => course._id === value);

      if (selectedCourse) {
        setFormData((prev) => ({
          ...prev,
          courses: [{
            _id: selectedCourse._id,
            name: selectedCourse.name,  // Store course name
            fees: selectedCourse.fees,
            duration: selectedCourse.duration
          }]
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.files[0], // Store the file object
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();


    // Append all fields dynamically
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "courses") {
        data.append("courses", JSON.stringify(value)); // ✅ Convert to JSON
      } else {
        data.append(key, value);
      }
    });

    try {
      const response = await axios.post("http://localhost:5000/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Success:", response.data);
      alert(response.data.message);

      setFormData({
        name: "",
        dateOfBirth: "",
        gender: "",
        educationalQualification: "",
        mobileNumber: "",
        email: "",
        guardiansName: "",
        guardiansOccupation: "",
        guardiansMobile: "",
        trainingMode: "",
        scopeIndiaLocation: "",
        preferredTrainingTimings: [],
        address: "",
        country: "",
        state: "",
        city: "",
        pinCode: "",
        courses: "",
        profilePicture: null,
      });
      fileInputRef.current.value = null; // ✅ Clear the file input
    } catch (error) {
      alert("Registration failed! Please try again.");
      console.error("Error:", error);
    }
  };


  return (
    <>
      <Header />
      <div className="container-fluid p-0 m-0">
        {/* First container-fluid (No background) */}
        <div className="container-fluid p-0 m-0"
          style={{
            backgroundImage: "url('/images/snowpark-skis-headerbg2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100vw", // Full viewport width
            minHeight: "1200px",// Adjust height as needed
            backgroundAttachment: "fixed",
          }}>

          <div className="container-fluid" style={{ paddingTop: "150px" }}>
            <p className="display-4 text-center REGIS-HEAD" style={{ paddingTop: "150px" }}>Registration</p>
            <h2 className="h4 text-center pt-1 just-a-matter">It's just a matter of 80 days to an IT job!</h2>
          </div>

          <div className="container "
            style={{
              backgroundImage: "url('/images/contactBg2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "80%",
              minHeight: "800px",
              marginTop: "60px"

            }}>
            {/*FORM*/}
            <form onSubmit={handleSubmit}>
              <div className="row justify-content-center m-0 w-100 gap-4 "
                style={{ padding: "20px", paddingTop: "40px", paddingBottom: "40px" }}>
                {/*Column 1*/}
                <div className="col-12 col-md-5 text-black boxOne" >

                  {/*fullName*/}
                  <div className="">
                    <label htmlFor="fullName" className="form-label pt-3 lab">
                      Full Name <span className="">(required)</span>
                    </label>
                    <input
                      type="text"
                      className="form-control  border-black rounded-0"
                      id="fullName"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/*date-of-birth*/}
                  <div className="">
                    <label htmmlFor="date-of-birth" className="form-label pt-3 lab">
                      Date of Birth <span className="">(required)</span>
                    </label>
                    <input
                      type="date"
                      className="form-control border-black rounded-0"
                      id="date-of-birth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Gender*/}
                  <div className="">
                    <label className="form-label pt-3 lab">
                      Gender <span className="text-black">(required)</span>
                    </label><br />

                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="male"
                        name="gender"
                        value="Male"
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="male" className="form-check-label lab">Male</label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="female"
                        name="gender"
                        value="Female"
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="female" className="form-check-label lab">Female</label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="other"
                        name="gender"
                        value="Other"
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="other" className="form-check-label lab">Other</label>
                    </div>

                  </div>

                  {/*Educational Qualification*/}
                  <div className="">
                    <label htmlFor="education" className="form-label pt-3 lab">
                      Educational Qualification <span className="">(required)</span>
                    </label>
                    <input
                      type="text"
                      className="form-control border-black rounded-0"
                      id="education"
                      name="educationalQualification"
                      value={formData.educationalQualification}
                      onChange={handleChange}
                      required
                    />
                  </div>


                  {/* Choose Your Course */}
                  <div>
                    <label htmlFor="course" className="form-label pt-3 lab">
                      Choose Your Course <span className="">(required)</span>
                    </label>
                    <select
                      id="course"
                      name="courses"
                      value={formData.courses.length > 0 ? formData.courses[0]._id : ""}
                      onChange={handleChange}
                      className="form-control border-none rounded-0"
                    >
                      <option value="">Choose your course!</option>

                      {courses.length === 0 ? (
                        <option disabled>No courses available</option>
                      ) : (
                        courses.flatMap((category) =>
                          category.courses.map((course) => (
                            <option key={course._id} value={course._id}>
                              {course.name}
                            </option>
                          ))
                        )
                      )}
                    </select>
                  </div>




                  {/* mobileNumber */}
                  <div className="">
                    <label htmlFor="mobileNumber" className="form-label pt-3 lab">
                      Mobile Number <span className="">(required)</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control border-black rounded-0"
                      id="mobileNumber"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* email */}
                  <div className="">
                    <label htmlFor="email" className="form-label pt-3 lab">
                      Email <span className="">(required)</span>
                    </label>
                    <input
                      type="email"
                      className="form-control border-black rounded-0"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* guardiansMobile */}
                  <div className="">
                    <label htmlFor="guardiansMobile" className="form-label pt-3 lab">
                      Guardian's Mobile
                    </label>
                    <input
                      type="tel"
                      className="form-control border-black rounded-0"
                      id="guardiansMobile"
                      name="guardiansMobile"
                      value={formData.guardiansMobile}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Training Mode */}
                  <div>
                    <label className="form-label pt-3 lab">
                      Training Mode <span className="">(required)</span>
                    </label> <br />
                    {trainingModes.map((mode) => (
                      <label key={mode} className="fw-bold me-3">
                        <input type="radio" name="trainingMode" value={mode} onChange={handleChange} required /> {mode}
                      </label>
                    ))}
                  </div>

                  {/* SCOPE INDIA Location */}
                  <div>
                    <label className="form-label pt-2 lab">
                      SCOPE INDIA Location (required)
                    </label> <br />
                    {locations.map((loc) => (
                      <label key={loc} className="fw-bold me-3">
                        <input type="radio" name="scopeIndiaLocation" value={loc} onChange={handleChange} required /> {loc}
                      </label>
                    ))}
                  </div>


                </div>

                {/*Column 2*/}
                <div className="col-12 col-md-5 text-black boxTwo" >


                  {/* Guardian's Name */}
                  <div className="">
                    <label htmlFor="guardiansName" className="form-label pt-3 lab">
                      Guardian's Name
                    </label>
                    <input
                      type="text"
                      className="form-control border-black rounded-0"
                      id="guardiansName"
                      name="guardiansName"
                      value={formData.guardiansName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Guardian's Occupation */}
                  <div className="">
                    <label htmlFor="guardiansOccupation" className="form-label pt-3 lab">
                      Guardian's Occupation
                    </label>
                    <input
                      type="text"
                      className="form-control border-black rounded-0"
                      id="guardiansOccupation"
                      name="guardiansOccupation"
                      value={formData.guardiansOccupation}
                      onChange={handleChange}
                      required
                    />
                  </div>


                  {/* Preferred Training Timings */}
                  <div className="">
                    <label className="form-label pt-3 fw-bold">
                      Preferred Training Timings <span className="">(required)</span>
                    </label>
                    <div>
                      {timings.map((time) => (
                        <div key={time} className="fw-bold">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="preferredTrainingTimings"
                            value={time}
                            onChange={handleChange}
                            id={time}
                          />
                          <label className="form-check-label" htmlFor={time}>{time}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="">
                    <label htmlFor="address" className="form-label pt-3 lab">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control  border-black rounded-0"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Country */}
                  <div className="">
                    <label htmlFor="country" className="form-label pt-3 lab">
                      Country
                    </label>
                    <input
                      type="text"
                      className="form-control  border-black rounded-0"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* State */}
                  <div className="">
                    <label htmlFor="State" className="form-label pt-3 lab">
                      State
                    </label>
                    <input
                      type="text"
                      className="form-control  border-black rounded-0"
                      id="State"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* City */}
                  <div className="">
                    <label htmlFor="City" className="form-label pt-3 lab">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control  border-black rounded-0"
                      id="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* PIN/Zip Code */}
                  <div className="">
                    <label htmlFor="pinCode" className="form-label pt-3 lab">
                      PIN/Zip Code
                    </label>
                    <input
                      type="text"
                      className="form-control border-black rounded-0"
                      id="pinCode"
                      pattern="[0-9]{4,10}"
                      title="Enter a valid PIN/Zip Code"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="mt-3">
                    <label htmlFor="imageUpload" className="form-label lab">
                      Upload Profile Picture
                    </label>
                    <input
                      type="file"
                      className="form-control border-black rounded-0"
                      id="profilePicture"
                      name="profilePicture"
                      accept="image/*"
                      onChange={handleFileChange}
                      ref={fileInputRef}

                    />
                  </div>

                  {/* Complete Registration Button */}
                  <div className="container-fluid px-0">
                    <div className="row">
                      <div className="col-12 mt-3">
                        <button type="submit" className="btn btn-primary w-100 py-2 rounded-2 com-reg-button p-0">
                          Complete Registration
                        </button>
                      </div>
                    </div>
                  </div>


                </div>


              </div>
            </form>
          </div>



          {/*Location Section*/}
          <div className="d-flex" style={{ backgroundColor: "rgb(4,28,93)" }} >
            <div className="container">

              <div className="container Locations">
                <h2 className="pt-5" style={{ fontSize: "40px" }}>Locations</h2>
              </div>



              <div className="row justify-content-center gap-3">
                <div className="col-md-5 col-12  p-4  mx-md-2 mb-3 colu ">
                  <ul className='list-unstyled p-3'>
                    <p className='heading'>Technopark TVM, Kerala</p>
                    <li className='loc bi bi-geo-alt-fill '> Phase 1, Main Gate, Diamond Arcade, Near Technopark, Trivandrum</li>
                    <li className='loc bi bi-telephone-fill pt-1'> 9745936073</li>
                    <li className='loc bi bi-envelope-fill pt-1'> technopark@scopeindia.org</li>
                    <li className='loc bi bi-link-45deg pt-1'> www.scopeindia.org</li>
                    <li className='loc bi bi-map pt-1'> Location Route Map</li>
                  </ul>
                </div>
                <div className="col-md-5 col-12  p-4 mx-md-2 mb-3 colu">
                  <ul className='list-unstyled p-3'>
                    <p className='heading'>Thampanoor TVM, Kerala</p>
                    <li className='loc bi bi-geo-alt-fill '> TC 25/1403/3, Athens Plaza, SS Kovil Road, Thampanoor, Trivandrum, Kerala 695001</li>
                    <li className='loc bi bi-telephone-fill pt-1'> 9745936073</li>
                    <li className='loc bi bi-envelope-fill pt-1'>info@scopeindia.org</li>
                    <li className='loc bi bi-link-45deg pt-1'> www.scopeindia.org</li>
                    <li className='loc bi bi-map pt-1'> Location Route Map</li>
                  </ul>
                </div>
              </div>

              <div className="row justify-content-center gap-3 mt-2">
                <div className="col-md-5 col-12  p-4  mx-md-2 mb-3 colu ">
                  <ul className='list-unstyled p-3'>
                    <p className='heading'>Kochi, Kerala</p>
                    <li className='loc bi bi-geo-alt-fill '> SCOPE INDIA, Vasanth Nagar Rd, near JLN Metro Station, Kaloor, Kochi, Kerala 682025</li>
                    <li className='loc bi bi-telephone-fill pt-1'>7592939481</li>
                    <li className='loc bi bi-envelope-fill pt-1'>kochi@scopeindia.org</li>
                    <li className='loc bi bi-link-45deg pt-1'> www.scopeindia.org</li>
                    <li className='loc bi bi-map pt-1'> Location Route Map</li>
                  </ul>
                </div>
                <div className="col-md-5 col-12  p-4 mx-md-2 mb-3 colu">
                  <ul className='list-unstyled p-3'>
                    <p className='heading'>Nagercoil, Tamil Nadu</p>
                    <li className='loc bi bi-geo-alt-fill '> SCOPE INDIA, Near WCC College, Palace Rd, Nagercoil, Tamil Nadu 629001</li>
                    <li className='loc bi bi-telephone-fill pt-1'> 8075536185</li>
                    <li className='loc bi bi-envelope-fill pt-1'>ngl@scopeindia.org</li>
                    <li className='loc bi bi-link-45deg pt-1'>  www.scopeindia.org</li>
                    <li className='loc bi bi-map pt-1'> Location Route Map</li>
                  </ul>
                </div>
              </div>

              <div className="row justify-content-center gap-3 mt-2">
                <div className="col-md-5 col-12  p-4  mx-md-2 mb-3 colu ">
                  <ul className='list-unstyled p-3'>
                    <p className='heading'>Nagercoil, Tamil Nadu</p>
                    <li className='loc bi bi-geo-alt-fill '> SCOPE INDIA, Pharma Street, 5/2 Ward 28, Distillery Road, Putheri Nagercoil (Near WCC Jn)</li>
                    <li className='loc bi bi-telephone-fill pt-1'> 8075536185</li>
                    <li className='loc bi bi-envelope-fill pt-1'> ngl@scopeindia.org</li>
                    <li className='loc bi bi-link-45deg pt-1'> www.scopeindia.org</li>
                    <li className='loc bi bi-map pt-1'> Location Route Map</li>
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
      </div >



      <FooterRegisterAndContact />
    </>
  );
};

export default Register;
