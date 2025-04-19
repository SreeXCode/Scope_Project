import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/Login.css";
import FooterHomeAndLogin from "../components/Footer-Home&Login";

const AdminResetPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/admin/reset-password", {
                email,
                otp,
                password,
                confirmPassword,
            });

            toast.success(response.data.message);
            setTimeout(() => navigate("/AdminLogin"), 3000); // Redirect after success
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
                <div className="container-fluid p-0 m-0"
                    style={{
                        backgroundImage: "url('/images/snowpark-skis-headerbg2.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        width: "100vw",
                        minHeight: "1050px",
                        backgroundAttachment: "fixed",
                        position: "relative",
                    }}>
                    <div className="container-fluid" style={{ paddingTop: "50px" }}>
                        <p className="display-4 text-center REGIS-HEAD" style={{ paddingTop: "50px" }}>Reset Password</p>
                        <h2 className="h4 text-center pt-1 just-a-matter">Securely reset your password.</h2>
                    </div>

                    <div className="container"
                        style={{
                            backgroundImage: "url('/images/contactBg2.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            width: "450px",
                            minHeight: "540px",
                            marginTop: "60px",
                            borderRadius: "5px",
                            maxWidth: "500px",
                        }}>
                        <div className="" style={{ paddingTop: "30px" }}>
                            <h2 className="text-center SignIn fs-2 fw-bold">Reset Password</h2>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="container mt-2">
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

                            <div className="container mt-3">
                                <label className="form-label fw-bold fs-5 font-monospace" style={{ color: "rgb(3, 28, 99)" }}>
                                    Enter OTP
                                </label>
                                <input type="text"
                                    className="form-control mt-1"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="container mt-3">
                                <label className="form-label fw-bold fs-5 font-monospace"
                                    style={{ color: "rgb(3, 28, 99)" }}>Password</label>
                                <input type="password"
                                    className="form-control mt-1"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </div>

                            <div className="container mt-3">
                                <label className="form-label fw-bold fs-5 font-monospace"
                                    style={{ color: "rgb(3, 28, 99)" }}>Confirm Password</label>
                                <input type="password"
                                    className="form-control mt-1"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required />
                            </div>

                            <div className="container-fluid mt-3">
                                <button type="submit" disabled={loading} className="btn container-fluid fs-4 fw-bold font-monospace m-0"
                                    style={{
                                        backgroundColor: "#18cf36",
                                        color: "white",
                                        padding: "1px",
                                    }}>
                                    {loading ? "Setting Password..." : "Set Password"}
                                </button>
                            </div>
                        </form>

                        <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} />
                    </div>

                    <img src="/images/snowSprinkles.png" className="img-fluid" alt="Centered Image"
                        style={{
                            width: "100%",
                            height: "auto",
                            position: "absolute",
                            bottom: "0",
                            left: "0",
                        }}
                    />
                </div>
            </div>

            <FooterHomeAndLogin />
        </>
    );
};

export default AdminResetPassword;
