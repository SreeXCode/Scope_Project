import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, ListGroup, Spinner, Container, Row ,Col} from "react-bootstrap";

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  

  console.log('profile', profile)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/profile", {
          withCredentials: true,
        });
        if (response.data.success) {
          setProfile(response.data.admin);
        } else {
          navigate("/login"); // Redirect if not authorized
        }
      } catch (error) {
        console.error("Error fetching profile", error);
        navigate("/login"); // Redirect on error
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!profile) {
    return <p className="text-center text-danger">Profile not found.</p>;
  }

  // Construct profile picture URL
  const baseUrl = "http://localhost:5000/uploads/";
  const imageUrl = profile.profilePicture ? `${baseUrl}${profile.profilePicture}` : "/default-avatar.png";


  return (
    <Container className="" style={{marginTop:"100px"}}>
  <Row className="justify-content-center ">
    <Col md={10}>
      <Row>
        {/* Column 1: Image + Edit Button */}
        <Col md={4} className="text-center mb-3">
          <h4 className="Profile mb-3">Admin Profile</h4>
          <img
            src={imageUrl}
            alt="Profile"
            style={{ width: "200px", height: "200px" }}
            className="mb-3"
          />
          <br />
          <button
            className="btn bg-success text-white"
            onClick={() =>
              navigate("/AdminDashboard", {
                state: { show: "AdminEditProfile" },
              })
            }
          >
            Edit Profile
          </button>
        </Col>

        {/* Column 2: Profile Details */}
        <Col md={8}>
          <Card className="bg-secondary text-white">
            <Card.Body>
              <ListGroup variant="flush" className="fs-7 font-style">
                <ListGroup.Item className="bg-secondary text-white">
                  <strong>Name:</strong> {profile.name}
                </ListGroup.Item>
                <ListGroup.Item className="bg-secondary text-white">
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(profile.dateOfBirth).toLocaleDateString()}
                </ListGroup.Item>
                <ListGroup.Item className="bg-secondary text-white">
                  <strong>Gender:</strong> {profile.gender}
                </ListGroup.Item>
                <ListGroup.Item className="bg-secondary text-white">
                  <strong>Phone:</strong> {profile.phone}
                </ListGroup.Item>
                <ListGroup.Item className="bg-secondary text-white">
                  <strong>Email:</strong> {profile.email}
                </ListGroup.Item>
                <ListGroup.Item className="bg-secondary text-white">
                  <strong>Address:</strong> {profile.address}, {profile.city},{" "}
                  {profile.state}, {profile.country}, {profile.pinCode}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Col>
  </Row>
</Container>

  );
};

export default AdminProfile;
