import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, ListGroup, Spinner, Button, Form } from "react-bootstrap";
import Header from '../components/Header'
import FooterRegisterAndContact from "../components/Footer-Reg&Contact";
import '../styles/UserProfile.css'
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/profile", { withCredentials: true });
        if (response.data.success) {
          setProfile(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle Unenroll
  const handleUnenroll = async (courseId) => {
    try {
      const response = await axios.post("http://localhost:5000/remove-enroll",
        { courseId },
        { withCredentials: true }
      );

      console.log("Unenroll Response:", response.data);
      alert(response.data.message);

      // ✅ Immediately update the state to remove the unenrolled course
      setProfile((prevProfile) => ({
        ...prevProfile,
        courses: prevProfile.courses.filter(course => course._id !== courseId)
      }));

      // Optionally refresh the user data after unenrollment
    } catch (error) {
      console.error("Unenrollment Error:", error);
      alert(error.response?.data?.message || "Unenrollment failed");
    }
  };


  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  }

  if (!profile) {
    return <p className="text-center mt-5">Failed to load profile.</p>;
  }

  // Construct profile picture URL
  const baseUrl = "http://localhost:5000/uploads/";
  const imageUrl = profile.profilePicture ? `${baseUrl}${profile.profilePicture}` : "/default-avatar.png";


  return (
    <>

      <Container className="mt-4" >
        {/* Profile Details */}
        <h3 className="fw-semibold category text-center">
          Profile
        </h3>

        <div className="container-fluid mt-4 px-3"> {/* px-3 adds left/right spacing on small screens */}
          <div className="row justify-content-center">
            <div className="col-md-6 col-12 mb-4 d-flex flex-column align-items-center">
              {/* Profile Picture */}
              <div className="ms-md-3 mb-3 mb-md-0 text-center">
                <img
                  src={`http://localhost:5000/uploads/${profile.profilePicture}`}
                  alt="Profile"
                  className="profile-img"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>

              <div className=" container  w-100 ">
                <button className="btn btn-success w-100 mx-1 mt-4" style={{ height: "70px" }} 
                onClick={() => navigate("/StudentDashBoard",{state:{show:"editProfile"}})}>
                 <spam className=" fs-5 font-style2" >Edit Profile</spam> 
                </button>
              </div>
            </div>

            <div className="col-md-6 col-12 m-0 p-0"  >
              <Card className="mb-4 m-0 p-0 bg-secondary" >
                <Card.Body className="m-0 p-0" >
                  <ListGroup variant="flush" className="fs-7 font-style">
                    <ListGroup.Item className="bg-secondary text-white"><strong>Name:</strong> {profile.name}</ListGroup.Item>
                    <ListGroup.Item className="bg-secondary text-white"><strong>Date of Birth:</strong> {new Date(profile.dateOfBirth).toLocaleDateString()}</ListGroup.Item>
                    <ListGroup.Item className="bg-secondary text-white"><strong>Gender:</strong> {profile.gender}</ListGroup.Item>
                    <ListGroup.Item className="bg-secondary text-white"><strong>Educational Qualification:</strong> {profile.educationalQualification}</ListGroup.Item>
                    <ListGroup.Item className="bg-secondary text-white"><strong>Mobile Number:</strong> {profile.mobileNumber}</ListGroup.Item>
                    <ListGroup.Item className="bg-secondary text-white"><strong>Email:</strong> {profile.email}</ListGroup.Item>
                    <ListGroup.Item className="bg-secondary text-white"><strong>Guardian's Name:</strong> {profile.guardiansName}</ListGroup.Item>
                    <ListGroup.Item className="bg-secondary text-white"><strong>Guardian's Mobile:</strong> {profile.guardiansMobile}</ListGroup.Item>
                    <ListGroup.Item className="bg-secondary text-white"><strong>Guardian's Occupation:</strong> {profile.guardiansOccupation}</ListGroup.Item>
                    <ListGroup.Item className="bg-secondary text-white"><strong>Training Mode:</strong> {profile.trainingMode}</ListGroup.Item>
                    <ListGroup.Item className="bg-secondary text-white"><strong>Scope India Location:</strong> {profile.scopeIndiaLocation}</ListGroup.Item>
                    <ListGroup.Item className="bg-secondary text-white"><strong>Preferred Training Timings:</strong> {profile.preferredTrainingTimings.join(", ")}</ListGroup.Item>
                    <ListGroup.Item className="bg-secondary text-white"><strong>Address:</strong> {profile.address}, {profile.city}, {profile.state}, {profile.country}, {profile.pinCode}</ListGroup.Item>
                  </ListGroup>

                </Card.Body>
              </Card>
            </div>
          </div>
        </div>




        {/* Enrolled Courses - Display in Table */}
        <h3 className="fw-semibold category mt-5">Enrolled Courses</h3>

        <Card>
          <Card.Body>
            {profile.courses.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-bordered shadow-sm mt-3">
                  <thead className="table-success">
                    <tr>
                      <th>Course Name</th>
                      <th className="text-center">Duration</th>
                      <th className="text-center">Fees</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.courses.map((course) => (
                      <tr key={course._id} className="tabledata">
                        <td>{course.name}</td>
                        <td className="text-center">{course.duration}</td>
                        <td className="text-center">₹{course.fees}</td>
                        <td className="text-center">
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleUnenroll(course._id)}
                          >
                            Un Enroll
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-muted">No enrolled courses</p>
            )}
          </Card.Body>
        </Card>
      </Container>

    </>
  );
};

export default UserProfile;
