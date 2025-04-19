import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import '../styles/Login.css'
import FooterHomeAndLogin from "../components/Footer-Home&Login";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!email || !password) {
            toast.error("Please fill in all fields", { position: "top-center" });
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/admin/login", 
                { email, password },
                { withCredentials: true }
              );
            toast.success(response.data.message);

            const token = response.data.token;
            console.log('token', token)
            if (token) {
                setTimeout(() => navigate("/AdminDashBoard"), 2000);
            } else {
                setTimeout(() => navigate("/Adminlogin"), 2000);
            }

        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
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
                        minHeight: "1050px",// Adjust height as needed
                        backgroundAttachment: "fixed",
                        position: "relative"
                    }}>

                    <div className="container-fluid" style={{ paddingTop: "50px" }}>
                        <p className="display-4 text-center REGIS-HEAD" style={{ paddingTop: "50px" }}>Sign In</p>
                        <h2 className="h4 text-center pt-1 just-a-matter">It's just a matter of 80 days to an IT job!</h2>
                    </div>

                    <div className="container"
                        style={{
                            backgroundImage: "url('/images/contactBg2.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            width: "auto",
                            minHeight: "530px",
                            marginTop: "60px",
                            borderRadius: "5px",
                            maxWidth: "500px"

                        }}>
                        {/*LOGIN*/}
                        <div className="" style={{ paddingTop: "50px" }}>
                            <h2 className="text-center SignIn">LogIn</h2>
                        </div>

                        <form onSubmit={handleLogin}>
                            {/* Email Field */}
                            <div className="container mt-3">
                                <label className="form-label fw-bold fs-5 font-monospace"
                                    style={{ color: "rgb(3, 28, 99)" }}>Email address</label>
                                <input type="email"
                                    className="form-control mt-1"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div className="container mt-3">
                                <label className="form-label fw-bold fs-5 font-monospace"
                                    style={{ color: "rgb(3, 28, 99)", }}>Password</label>
                                <input type="password"
                                    className="form-control mt-1"
                                    placeholder="Enter your password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="container-fluid mt-4">
                                <button type="submit" disabled={loading} className="btn container-fluid fs-4 fw-bold font-monospace m-0"
                                    style={{
                                        backgroundColor: "#18cf36",
                                        color: "white",
                                        padding: "1px"
                                    }}>
                                    {loading ? "Logging in..." : "Login"}
                                </button>
                            </div>

                            {/*Forgot Password*/}
                            <div className="container-fluid text-center mt-3 fw-bold fs-5 font-monospace">
                                <a href="/AdminForgotPassword"
                                    style={{ color: "rgb(3, 28, 99)", textDecoration: "none" }}
                                    className="text-decoration-none">
                                    Forgot Password
                                </a>
                            </div>


                        </form>
                        {/* Toast Notification Container */}
                        <ToastContainer
                            position="top-center"
                            autoClose={2000}
                            hideProgressBar={false} // ✅ Fixed syntax
                        />



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
            </div>



            <FooterHomeAndLogin />
        </>

    );
};

export default AdminLogin;
