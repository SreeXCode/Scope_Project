import React, { useState, useEffect } from "react";
import { Link, useNavigate ,useLocation} from "react-router-dom";
import { Container, Row, Col, Nav,} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Welcome from "../StudentDashBoard-Pages/Welcome";
import Courses from "../StudentDashBoard-Pages/EntrollCourses";
import Profile from "../StudentDashBoard-Pages/UserProfile";
import "../styles/StudentDashBoard.css";
import Header from "../components/Header";
import ChangePassword from "./ChangePassword";
import EditProfile from "../StudentDashBoard-Pages/EditProfile";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("welcome");
  const [loading, setLoading] = useState(true); // 🟡 Loading state added
  const location = useLocation();

       

  // ✅ Check token on component mount
  useEffect(() => {
    const checkToken = async () => {
      try {
        await axios.get("http://localhost:5000/user/dashboard", {
          withCredentials: true,
        });

        setLoading(false); // Token valid → show dashboard
      } catch (err) {
        toast.warning("Please login to access the dashboard", {
          position: "top-center",
        });
        navigate("/login"); // Token invalid → redirect
      }
    };
    checkToken();
  }, [navigate]);

  // ✅ Set page from navigate state
  useEffect(() => {
    if (location.state?.show) {
      setActivePage(location.state.show);
      console.log("loc state", location.state.show);
    }
  }, [location, loading]);

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully!", { position: "top-center" });
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout failed. Try again!", { position: "top-center" });
    }
  };


  // ✅ Show loader or nothing while checking auth
  if (loading) return null; // or return <div>Loading...</div>;

  return (
    <>
      <Header />
      <Container fluid className="p-0 m-0">
        <Row className="container-fluid p-0 m-0">
          {/* Sidebar */}
          <Col md={3} className="fixed-sidebar d-flex flex-column align-items-center">
            <Nav className="d-flex flex-column w-100 text-center mt-4">
              <h2 className="text-center Dashboard" style={{ marginTop: "70px" }}>
                Dashboard
              </h2>
              <Nav.Link onClick={() => setActivePage("welcome")} className="text-white fs-4 Welcome">
                🏠 Welcome
              </Nav.Link>
              <Nav.Link onClick={() => setActivePage("profile")} className="text-white fs-4 Profile">
                👤 My Profile
              </Nav.Link>
              <Nav.Link onClick={() => setActivePage("courses")} className="text-white fs-4 Courses">
                📚 Courses
              </Nav.Link>
              
              <div className="container d-flex justify-content-center align-items-center my-3">
                <button
                  onClick={() => setActivePage("changePassword")}
                  className="btn text-white text-center bg-success rounded-pill w-100 fnt-style"
                  style={{ textDecoration: "none" }}
                >
                  Change Password
                </button>
              </div>


            </Nav>

            {/* Logout */}
            <div className="container d-flex justify-content-center align-items-center ">
              <Link to="/Login" className="w-100">
                <button
                  onClick={handleLogout}
                  className="btn bg-danger text-white rounded-pill w-100 fnt-style"
                  
                >
                Logout
                </button>
              </Link>
            </div>
          </Col>

          {/* Main Content */}
          <Col
            md={9}
            className="scrollable-content"
            style={{
              backgroundImage: "url('/images/contactBg2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh",
            }}
          >
            {activePage === "welcome" && <Welcome />}
            {activePage === "profile" && <Profile />}
            {activePage === "courses" && <Courses />}
            {activePage === "changePassword" && <ChangePassword />}
            
            {activePage === "editProfile" && <EditProfile />}

            
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StudentDashboard;
