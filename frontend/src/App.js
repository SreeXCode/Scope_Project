

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home'
import Register from './pages/Register';
import ContactUs from './pages/Contact';
import Login from './pages/Login';
import CoursesList from './pages/CoursesList.js'
import SignInGenOtp from './pages/SignInGenOtp.js';
import OtpVerify from './pages/OtpVerify.js';
import SetPassword from './pages/SetPassword.js';
import StudentDashBoard from './pages/StudentDashBoard.js';
import AdminDashBoard from './pages/AdminDashBoard.js'
import EntrollCourses from './StudentDashBoard-Pages/EntrollCourses.js';
import UserProfile from './StudentDashBoard-Pages/UserProfile.js';
import ForgotPassword from './pages/ForgotPassword.js';
import ResetPassword from './pages/ResetPassword.js';
import AdminDashboard from './pages/AdminDashBoard.js';
import AdminLogin from './pages/AdminLogin.js';
import EditProfile from './StudentDashBoard-Pages/EditProfile.js';
import ManageUsers from './AdminDashBoard-pages/ManageUsers.js';
import AdminForgotPassword from './pages/AdminForgotPassword.js';
import AdminResetPassword from './pages/AdminResetPassword.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Contact" element={<ContactUs />} />
        <Route path="/Courses" element={<CoursesList />} />
        <Route path="/SignInGenOtp" element={<SignInGenOtp />} />
        <Route path="/OtpVerify" element={<OtpVerify />} />
        <Route path="/SetPassword" element={<SetPassword />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/StudentDashBoard" element={<StudentDashBoard />} />

        {/* <Route path="/EntrollCourses" element={<EntrollCourses/>} /> */}
        {/* <Route path="/UserProfile" element={<UserProfile/>} />  */}
        {/* <Route path="/EditProfile" element={<EditProfile/>} /> */}

       

        {/*ADMIN ROUTES*/}
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/AdminLogin" element={<AdminLogin />} /> 
        <Route path="/AdminForgotPassword" element={<AdminForgotPassword />} />
        <Route path="/AdminResetPassword" element={<AdminResetPassword />} /> 

      </Routes>
    </Router>
  );
}

export default App;

