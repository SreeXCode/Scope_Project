import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import '../styles/Welcome.css';
import { useNavigate } from "react-router-dom";

const AdminWelcome = () => {
    const navigate =  useNavigate()
    const [user, setUser] = useState({}); // Initialize as null

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:5000/admin/profile", { withCredentials: true });
                console.log("response", response.data.admin);

                if (response.data.success) {
                    setUser(response.data.admin);
                }
            } catch (error) {
                console.error("Error fetching user", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <>
            <Card className="p-4 shadow text-center text-warning welcom" style={{ backgroundColor: "#041a6b" }}>
                <h2 className="">🌟 Welcome to {user.name} 🌟</h2>
                <h5>Keep shaping minds, managing courses, and inspiring learning every day.</h5>
                <blockquote className="blockquote">
                    "The function of education is to teach one to think intensively and to think critically.
                    Intelligence plus character – that is the goal of true education." – Martin Luther King Jr.
                </blockquote>
            </Card>

            <div className="container-fluid m-0 p-0">
                <div className="row m-0 p-0 d-flex justify-content-center">
                    <div className="col-12 col-md-6 d-flex justify-content-center">
                        <Button
                            className="mt-3 mt-md-5 btn-Welcom text-warning"
                            style={{
                                height: "220px", width: "100%", maxWidth: "455px",
                                backgroundColor: "#041a6b", border: "none" 
                            }}
                            onClick={()=>navigate("/AdminDashBoard",{state:{show:"AdminProfile"}})}

                        >
                            MY PROFILE
                        </Button>
                    </div>

                    <div className="col-12 col-md-6 d-flex justify-content-center">
                        <Button
                            className="mt-3 mt-md-5 btn-Welcom text-warning"
                            style={{
                                height: "220px", width: "100%", maxWidth: "455px",
                                backgroundColor: "#041a6b", border: "none"
                            }}
                            onClick={()=>navigate("/AdminDashBoard",{state:{show:"AddCourses"}})}
                        >
                            ADD COURSES
                        </Button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AdminWelcome;
