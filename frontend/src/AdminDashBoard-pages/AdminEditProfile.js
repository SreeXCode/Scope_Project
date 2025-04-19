import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Spinner, Container, Row, Card } from "react-bootstrap";

const AdminEditProfile = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        profilePicture: null,
    });
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:5000/admin/profile", {
                    withCredentials: true,
                });
                if (response.data.success) {
                    setProfile(response.data.admin);
                } else {
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching profile", error);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        if (e.target.name === "profilePicture") {
            setProfile({ ...profile, profilePicture: e.target.files[0] })
        } else {
            setProfile({ ...profile, [e.target.name]: e.target.value });
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const formData = new FormData();

            Object.entries(profile).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formData.append(key, value);
                }
            });


            const response = await axios.put(
                "http://localhost:5000/admin/profile",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.success) {
                alert("Profile updated successfully!");
                setProfile({
                    name: "",
                    email: "",
                    phone: "",
                    gender: "",
                    dateOfBirth: "",
                    address: "",
                    city: "",
                    state: "",
                    country: "",
                    pinCode: "",
                    profilePicture: null,
                });
                // ✅ Clear file input manually
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }

                navigate("/AdminDashboard", {
                    state: { show: "AdminEditProfile" },
                });
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Update error", error);
            alert("Something went wrong.");
        } finally {
            setUpdating(false);
        }
    };


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

    return (
        <Container className="mt-4 Profile">
            <Row className="justify-content-center">
                <div className="col-md-10 col-12">
                    <Card className="p-4 shadow-lg">
                        <h3 className="text-center mb-4">Edit Admin Profile</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" value={profile.name} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dateOfBirth"
                                    value={profile.dateOfBirth?.slice(0, 10)}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select name="gender" value={profile.gender} onChange={handleChange} required>
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control name="phone" value={profile.phone} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={profile.email} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control name="address" value={profile.address} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Form.Control name="city" value={profile.city} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>State</Form.Label>
                                <Form.Control name="state" value={profile.state} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Country</Form.Label>
                                <Form.Control name="country" value={profile.country} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Pin Code</Form.Label>
                                <Form.Control name="pinCode" value={profile.pinCode} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Profile Picture</Form.Label>
                                <Form.Control type="file" ref={fileInputRef} name="profilePicture" accept="image/*" onChange={handleChange} />
                            </Form.Group>
                            <div className="text-center d-flex justify-content-center  gap-3">
                                <Button type="submit" variant="primary" disabled={updating}
                                    className="w-25">
                                    {updating ? "Saving..." : "Save"}
                                </Button>

                                <Button className="w-25" variant="secondary"
                                    onClick={() => navigate("/AdminDashboard", {
                                        state: { show: "AdminProfile" },
                                    })}>
                                    Cancel
                                </Button>
                            </div>

                        </Form>
                    </Card>
                </div>
            </Row>
        </Container>
    );
};

export default AdminEditProfile;
