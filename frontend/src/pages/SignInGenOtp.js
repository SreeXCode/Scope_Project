import { useState } from "react";
import axios from "axios";
import Header from '../components/Header';
import '../styles/Login.css'
import FooterHomeAndLogin from "../components/Footer-Home&Login";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate


const SignInGenOtp = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // ✅ Create navigate function


    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/first-time-login", { email });

            // Show success message using toast
            toast.success(response.data.message || "OTP sent successfully!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                onClose: () => navigate("/OtpVerify") // ✅ Navigate after toast closes
            });
        } catch (error) {
            // Show error message using toast
            toast.error(error.response?.data?.message || "Something went wrong!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }

        setLoading(false);


    };
    

    return (
        <>
            <Header />
            <ToastContainer />
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
                        <p className="display-4 text-center REGIS-HEAD" style={{ paddingTop: "50px" }}>SignIn Generate Otp</p>
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
                            <h2 className="text-center SignIn">LogIn</h2>
                        </div>

                        <form onSubmit={handleSendOTP}>
                            {/* Email Field */}
                            <div className="container mt-3">
                                <label className="form-label fw-bold fs-5 font-monospace"
                                    style={{ color: "rgb(3, 28, 99)" }}>Email address</label>
                                <input type="email"
                                    className="form-control mt-1"
                                    placeholder="Enter your email"
                                    name="name"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            {/* Submit Button */}
                            <div className="container-fluid mt-5">
                                <button type="submit" disabled={loading} className="btn container-fluid fs-4 fw-bold font-monospace m-0"
                                    style={{
                                        backgroundColor: "#18cf36",
                                        color: "white",
                                        padding: "1px"
                                    }}>
                                    {loading ? "Sending..." : "Generate Otp"}
                                </button>
                            </div>
                        </form>


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

export default SignInGenOtp;
