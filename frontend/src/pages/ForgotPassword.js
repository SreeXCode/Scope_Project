import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/Login.css";
import FooterHomeAndLogin from "../components/Footer-Home&Login";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/forgot-password", { email });

            if (response.data.success) {
                toast.success("OTP sent to your email!");
                setTimeout(() => navigate("/ResetPassword"), 3000); // Redirect after success
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong!";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="container-fluid p-0 m-0">
                {/* Background Section */}
                <div className="container-fluid p-0 m-0"
                    style={{
                        backgroundImage: "url('/images/snowpark-skis-headerbg2.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        width: "100vw",
                        minHeight: "1050px",
                        backgroundAttachment: "fixed",
                        position: "relative"
                    }}>

                    <div className="container-fluid" style={{ paddingTop: "50px" }}>
                        <p className="display-4 text-center REGIS-HEAD" style={{ paddingTop: "50px" }}>Forgot Password</p>
                        <h2 className="h4 text-center pt-1 just-a-matter">It's just a matter of 80 days to an IT job!</h2>
                    </div>

                    {/* Forgot Password Form */}
                    <div className="container"
                        style={{
                            backgroundImage: "url('/images/contactBg2.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            width: "400px",
                            minHeight: "400px",
                            marginTop: "60px",
                            borderRadius: "5px",
                            maxWidth: "500px"
                        }}>
                        
                        <div className="" style={{ paddingTop: "50px" }}>
                            <h2 className="text-center SignIn fs-2 fw-bold">Forgot Password</h2>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Email Field */}
                            <div className="container mt-4">
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

                            {/* Send OTP Button */}
                            <div className="container-fluid mt-4">
                                <button type="submit" disabled={loading} className="btn container-fluid fs-4 fw-bold font-monospace m-0"
                                    style={{
                                        backgroundColor: "#18cf36",
                                        color: "white",
                                        padding: "0px"
                                    }}>
                                    {loading ? "Sending OTP..." : "Send OTP"}
                                </button>
                            </div>
                        </form>

                        {/* Toast Notification */}
                        <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} />
                    </div>

                    {/* Fixed Image at Bottom */}
                    <img
                        src="/images/snowSprinkles.png"
                        className="img-fluid"
                        alt="Centered Image"
                        style={{
                            width: "100%",
                            height: "auto",
                            position: "absolute",
                            bottom: "0",
                            left: "0"
                        }}
                    />
                </div>
            </div>

            <FooterHomeAndLogin />
        </>
    );
};

export default ForgotPassword;
