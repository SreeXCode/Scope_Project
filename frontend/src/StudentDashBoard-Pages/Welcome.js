import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import '../styles/Welcome.css'
import {useNavigate} from "react-router-dom"

const Welcome = () => {
    const [user, setUser] = useState({}); // Initialize as an empty object
    const navigate = useNavigate(); // Store the navigate function


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:5000/user/profile", { withCredentials: true });
                console.log("response", response.data.user);

                if (response.data.success) {
                    setUser(response.data.user);
                }
            } catch (error) {
                console.error("Error fetching user", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <>
            <Card className="p-4 shadow text-center text-warning welcom " style={{backgroundColor:"#041a6b"}}>
                <h2 className="">🌟 Welcome to {user.name} 🌟</h2>
                <h5>Manage your profile, enroll in courses, and track your learning journey.</h5>
                <blockquote className="blockquote">
                    "Education is the most powerful weapon which you can use to change the world." - Nelson Mandela
                </blockquote>
            </Card>
            <div className="container-fluid m-0 p-0">
                <div className="row m-0 p-0 d-flex justify-content-center">
                    <div className="col-12 col-md-6 d-flex justify-content-center">
                        <Button
                            className="mt-3 mt-md-5 btn-Welcom text-warning"
                            style={{ height: "220px", width: "100%", maxWidth: "455px", 
                                backgroundColor: "#041a6b", border: "none" }}
                                onClick={()=>navigate("/StudentDashBoard",{state:{show:"profile"}})}
                        >
                            MY PROFILE
                        </Button>
                    </div>

                    <div className="col-12 col-md-6 d-flex justify-content-center">
                        <Button
                            className="mt-3 mt-md-5 btn-Welcom text-warning"
                            style={{ height: "220px", width: "100%", maxWidth: "455px",
                                backgroundColor: "#041a6b", border: "none" }}
                                onClick={()=>navigate("/StudentDashBoard",{state:{show:"courses"}})}
                        >
                            COURSES
                        </Button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Welcome;
