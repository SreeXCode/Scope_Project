import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from '../components/Header';
import '../styles/Login.css'
import FooterHomeAndLogin from "../components/Footer-Home&Login";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate


const SetPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // ✅ Create navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/set-password", {
                email,
                password,
                confirmPassword,
            });

            toast.success(response.data.message);

            // ✅ Store the token and redirect after toast
            const token = response.data.token;
            if (token) {
                localStorage.setItem("token", token);
                setTimeout(() => navigate("/StudentDashBoard"), 3000);
            }
            else{
                setTimeout(() => navigate("/login"), 3000);

            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
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
                        <p className="display-4 text-center REGIS-HEAD" style={{ paddingTop: "50px" }}>Set Password</p>
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
                        <div className="" style={{ paddingTop: "65px" }}>
                            <h2 className="text-center SignIn">Set Password</h2>
                        </div>

                        <form onSubmit={handleSubmit}>

                            {/* Email Field */}
                            <div className="container mt-3">
                                <label className="form-label fw-bold fs-5 font-monospace"
                                    style={{ color: "rgb(3, 28, 99)" }}>Email address</label>
                                <input type="email"
                                    className="form-control mt-1"
                                    placeholder="Enter your email"
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </div>

                            {/* Confirm Password Field */}
                            <div className="container mt-3">
                                <label className="form-label fw-bold fs-5 font-monospace" style={{ color: "rgb(3, 28, 99)" }}>
                                    Confirm Password
                                </label>
                                <input type="password"
                                    className="form-control mt-1"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required />
                            </div>

                            {/* Submit Button */}
                            <div className="container-fluid mt-5">
                                <button type="submit"  disabled={loading} className="btn container-fluid fs-4 fw-bold font-monospace m-0"
                                    style={{
                                        backgroundColor: "#18cf36",
                                        color: "white",
                                        padding: "1px"
                                    }}>
                                              {loading ? "Setting Password..." : "Set Password"}

                                    </button>
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

export default SetPassword;
