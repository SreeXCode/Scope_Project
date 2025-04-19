import React, { useEffect, useState } from "react";
import axios from 'axios'
import Header from "../components/Header.js";
import FooterCourseAndAbout from "../components/Footer-Course&About.js";
import '../styles/CoursesList.css'

const CoursesList = () => {
    const [coursesData, setCoursesData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/courses") // Adjust API URL as needed
            .then((response) => {
                setCoursesData(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching courses:", error);
            });
    }, []);



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

                    {/*SCOPE INDIA PORTIONS*/}
                    <div className="container-fluid" style={{ marginTop: "200px" }}>
                        <h1 className="text-center scope-head-course">
                            <span style={{ fontStyle: "italic" }}>SCOPE</span> INDIA
                        </h1>

                        <h2 className="text-center Centerfor" style={{ marginTop: "18px" }}>
                            Center for Software, Networking, & Cloud Education
                        </h2>

                        <p style={{ marginTop: "15px" }} className="ptag">
                            All Trainers at SCOPE INDIA are working professionals,Software Engineers, Networking Engineers, and Software<br />
                            Test Engineers of Suffix E Solutions with<br />
                            <span style={{
                                color: " #FBBA02",
                                fontSize: "23px,",
                                fontWeight: "600"
                            }}>17 years of Industrial experience.</span>
                        </p>

                        <div className="d-flex justify-content-center">
                            <img src="/images/fivestar.png" className="img-fluid" alt="Centered jpg"
                                style={{ width: "340px", height: "auto", marginTop: "0px" }} />
                        </div>


                        <p class="text-center fiveRate" style={{ marginTop: "10px" }}>Google 4.9 * Rated Institute</p>
                    </div>

                    {/* COURSES LIST */}
                    <div className="container mx-auto p-4">
                        {coursesData.length > 0 ? (
                            <div className="space-y-6">
                                {coursesData.map((categoryItem) => (
                                    <div key={categoryItem._id} className="border-b pb-3">
                                        <h3 className="category mx-3 my-3" style={{ color: "white" }}>
                                            {categoryItem.category}
                                        </h3>

                                        {/* Group courses into rows, 3 per row */}
                                        {Array.from({ length: Math.ceil(categoryItem.courses.length / 3) }, (_, rowIndex) => (
                                            <div className="row mx-4 my-4 mt-0 mb-0 course" key={rowIndex}>
                                                {categoryItem.courses.slice(rowIndex * 3, rowIndex * 3 + 3).map((course) => (
                                                    <div key={course.id} className="col-md-4 mb-3">
                                                        <div className="p-2 border bg-light ps-3 course">
                                                            {course.name} {/* ✅ Display course name properly */}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No courses available</p>
                        )}
                    </div>


                    {/*BACKGROUND COLOR DARK BLUE bg-[#041a6b] */}
                    <div className="container-fluid w-full min-h-screen" style={{ backgroundColor: "#050A4C", minHeight: "auto" }}>

                        {/*Video Container*/}
                        <div
                            className="container-fluid d-flex align-items-center justify-content-center "
                            style={{
                                backgroundImage: "url('/images/contactBg2.jpg')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "repeat",
                                height: "auto", // Fixed height
                                width: "1200px", // Fixed width
                                maxWidth: "100%", // Ensures responsiveness
                                position: "relative",
                                bottom: "120px",
                                marginTop: "100px"
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
                                                width: "600px", // Fixed width
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
                                                <h2 className="fw-bold INDIAA"> </h2>
                                                <p className="fw-light we-are-open" style={{ marginBottom: "60px" }}>We are open 365 days </p>
                                            </div>

                                            <div className='container-fluid' style={{ position: "relative", bottom: "25px" }}>
                                                <p className='openseven'>SCOPE INDIA is open 7/24 hrs to talk to you and listen to your queries.</p>
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



                    </div>














                </div>

            </div>

            <FooterCourseAndAbout />
        </>
    );
};

export default CoursesList;