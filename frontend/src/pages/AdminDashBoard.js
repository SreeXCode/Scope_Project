import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Nav, } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/StudentDashBoard.css";
import Header from "../components/Header";
import AdminWelcome from "../AdminDashBoard-pages/AdminWelcome";
import AdminProfile from "../AdminDashBoard-pages/AdminProfile";
import AdminChangePassword from "../AdminDashBoard-pages/AdminChangePwd";
import AddCourses from "../AdminDashBoard-pages/AddCourses";
import RemoveCourseOrCategory from "../AdminDashBoard-pages/RemoveCourseOrCategory";
import ManageUsers from "../AdminDashBoard-pages/ManageUsers";
import AdminRegister from "../AdminDashBoard-pages/AdminRegister";
import ManageAdmins from "../AdminDashBoard-pages/ManageAdmin";
import AdminEditProfile from "../AdminDashBoard-pages/AdminEditProfile";
// import Courses from "../StudentDashBoard-Pages/EntrollCourses";
// import Profile from "../StudentDashBoard-Pages/UserProfile";

// import ChangePassword from "./ChangePassword";
// import EditProfile from "../StudentDashBoard-Pages/EditProfile";


const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("AdminWelcome");
  const navigate =  useNavigate()
  const location = useLocation();

  // ✅ Check token on component mount
    useEffect(() => {
      const checkToken = async () => {
        try {
          await axios.get("http://localhost:5000/admin/dashboard", {
            withCredentials: true,
          });
  
        } catch (err) {
          toast.warning("Please login to access the dashboard", {
            position: "top-center",
          });
          navigate("/AdminLogin"); // Token invalid → redirect
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
  }, [location]);

    // ✅ Logout function
    const handleLogout = async () => {
      try {
        await axios.post("http://localhost:5000/admin/logout", {}, { withCredentials: true });
        toast.success("Logged out successfully!", { position: "top-center" });
        navigate("/AdminLogin");
      } catch (error) {
        console.error("Logout Error:", error);
        toast.error("Logout failed. Try again!", { position: "top-center" });
      }
    };


  return (
    <>
      <Header />
      <Container fluid className="p-0 m-0">
        <Row className="container-fluid p-0 m-0">
          {/* Sidebar */}
          <Col md={3} className="fixed-sidebar d-flex flex-column align-items-center">
            <Nav className="d-flex flex-column w-100 text-center m-1">
              <h2 className="text-center Profile text-danger" style={{ marginTop: "70px" }}>
                Admin Dashboard
              </h2>
              <Nav.Link onClick={()=> setActivePage("AdminWelcome")} className="text-warning fs-4 Welcome ">
                🏠 Welcome
              </Nav.Link>
              <Nav.Link onClick={()=>setActivePage("AdminProfile")} className="text-warning fs-4 Profile">
                👤 My Profile
              </Nav.Link>
              <Nav.Link onClick={()=>setActivePage("AddCourses")} className="text-warning fs-4 Courses">
                📚 Add Courses
              </Nav.Link>
              <Nav.Link onClick={()=>setActivePage("RemoveCourseOrCategory")} className="text-warning fs-4 Courses">
                📚 Remove Courses
              </Nav.Link>
              <Nav.Link onClick={()=>setActivePage("ManageUsers")} className="text-warning fs-4 Courses">
                👤 Manage Users
              </Nav.Link>
              <Nav.Link onClick={()=>setActivePage("ManageAdmins")} className="text-warning fs-4 Courses">
                👤 Manage Admin
              </Nav.Link>

              <div className="container d-flex justify-content-center align-items-center ">
                <button

                  className="btn text-black text-center bg-light rounded-pill w-100 fnt-style"
                  style={{ textDecoration: "none" }}
                  onClick={()=>setActivePage("AdminRegister")}
                >
                  Register
                </button>
              </div>

              <div className="container d-flex justify-content-center align-items-center mt-3">
                <button

                  className="btn text-white text-center bg-success rounded-pill w-100 fnt-style"
                  style={{ textDecoration: "none" }}
                  onClick={()=>setActivePage("AdminChangePassword")}
                >
                  Change Password
                </button>
              </div>


            </Nav>

            {/* Logout */}
            <div className="container d-flex justify-content-center align-items-center mt-2">
              <Link to="/AdminLogin" className="w-100">
                <button
                  className="btn bg-danger text-white rounded-pill w-100 fnt-style"
                  onClick={handleLogout}

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
            {activePage === "AdminWelcome" && <AdminWelcome />}
            {activePage === "AdminProfile" && <AdminProfile />}
            {activePage === "AddCourses" && <AddCourses />}
            {activePage === "RemoveCourseOrCategory" && <RemoveCourseOrCategory />}
            {activePage === "ManageUsers" && <ManageUsers />}
            {activePage === "AdminRegister" && <AdminRegister />}
            {activePage === "AdminChangePassword" && <AdminChangePassword />}
            {activePage === "ManageAdmins" && <ManageAdmins />}
            {activePage === "AdminEditProfile" && <AdminEditProfile />}



          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDashboard;
