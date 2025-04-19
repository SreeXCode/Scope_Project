import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import FooterRegisterAndContact from "../components/Footer-Reg&Contact";
import Header from '../components/Header';
import '../styles/EditProfile.css'

const EditProfile = () => {
    const [formData, setFormData] = useState({
        name: "",
        dateOfBirth: "",
        gender: "",
        educationalQualification: "",
        mobileNumber: "",
        email: "",
        guardiansName: "",
        guardiansMobile: "",
        guardiansOccupation: "",
        trainingMode: "",
        scopeIndiaLocation: "",
        preferredTrainingTimings: "",
        address: "",
        country: "",
        state: "",
        city: "",
        pinCode: "",
        profilePicture: null,


    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get("http://localhost:5000/user/profile", { withCredentials: true });
                if (res.data.success) {
                    setFormData(res.data.user);
                }
            } catch (error) {
                console.error("Error fetching profile", error);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "profilePicture") {
            setFormData({ ...formData, profilePicture: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };


    const handleSave = async () => {
        try {
            const data = new FormData();

            data.append("name", formData.name);
            data.append("dateOfBirth", formData.dateOfBirth);
            data.append("gender", formData.gender);
            data.append("educationalQualification", formData.educationalQualification);
            data.append("mobileNumber", formData.mobileNumber);
            data.append("email", formData.email);
            data.append("guardiansName", formData.guardiansName);
            data.append("guardiansMobile", formData.guardiansMobile);
            data.append("guardiansOccupation", formData.guardiansOccupation);
            data.append("trainingMode", formData.trainingMode);
            data.append("scopeIndiaLocation", formData.scopeIndiaLocation);
            data.append("preferredTrainingTimings", formData.preferredTrainingTimings);
            data.append("address", formData.address);
            data.append("country", formData.country);
            data.append("state", formData.state);
            data.append("city", formData.city);
            data.append("pinCode", formData.pinCode);

            if (formData.profilePicture) {
                data.append("profilePicture", formData.profilePicture);
            }

            await axios.put("http://localhost:5000/user/profile", data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            navigate("/StudentDashboard",{
                state: { show: "profile" },
            });

        } catch (error) {
            console.error("Error updating profile", error);
        }
    };


    return (
        <>
           
                <Container className="container d-flex justify-content-center pt-3 pb-5 w-75 bg-container">


                    <Form className="w-100">
                        <h3 className="Edit-Profile text-center fw-bold">Edit Profile</h3>
                        {/* Name Field */}
                        <Form.Group className="edit-lab fw-bold">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                        </Form.Group>

                        {/* Date of Birth Field */}
                        <Form.Group className="edit-lab fw-bold">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                        </Form.Group>

                        {/* Gender Field */}
                        <Form.Group className="edit-lab fw-bold">
                            <Form.Label>Gender</Form.Label>
                            <div className="d-flex flex-row gap-3">
                                {["Male", "Female", "Other"].map((gender) => (
                                    <Form.Check
                                        key={gender}
                                        type="radio"
                                        label={gender}
                                        name="gender"
                                        value={gender}
                                        checked={formData.gender === gender}
                                        onChange={handleChange}
                                    />
                                ))}
                            </div>
                        </Form.Group>


                        {/*Educational Qualification*/}
                        <Form.Group className="edit-lab fw-bold">
                            <Form.Label>Educational Qualification</Form.Label>
                            <Form.Control
                                type="text"
                                name="educationalQualification"
                                value={formData.educationalQualification}
                                onChange={handleChange}
                                placeholder="Enter your qualification (e.g., BSc Computer Science)"
                            />
                        </Form.Group>

                        {/*Mobile Number*/}
                        <Form.Group className="edit-lab fw-bold">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                type="tel"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                placeholder="Enter your mobile number"
                            />
                        </Form.Group>

                        {/*Email*/}
                        <Form.Group className="edit-lab fw-bold">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
                        </Form.Group>

                        {/*Guardian's Name*/}
                        <Form.Group className="edit-lab fw-bold">
                            <Form.Label>Guardian's Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="guardiansName"
                                value={formData.guardiansName}
                                onChange={handleChange}
                                placeholder="Enter your guardian's name"
                            />
                        </Form.Group>

                        {/*Guardian's Mobile Number*/}
                        <Form.Group className="edit-lab fw-bold">
                            <Form.Label>Guardian's Mobile Number</Form.Label>
                            <Form.Control
                                type="tel"
                                name="guardiansMobile"
                                value={formData.guardiansMobile}
                                onChange={handleChange}
                                placeholder="Enter guardian's mobile number"
                            />
                        </Form.Group>

                        {/*Guardian's Occupation*/}
                        <Form.Group className="edit-lab fw-bold">
                            <Form.Label>Guardian's Occupation</Form.Label>
                            <Form.Control
                                type="text"
                                name="guardiansOccupation"
                                value={formData.guardiansOccupation}
                                onChange={handleChange}
                                placeholder="Enter guardian's occupation"
                            />
                        </Form.Group>
                        {/* Training Mode */}
                        <Form.Group className="edit-lab fw-bold">
                            <Form.Label>Training Mode</Form.Label>
                            <div className="d-flex flex-row gap-3">
                                {["Live Online", "Class Room"].map((mode) => (
                                    <Form.Check
                                        key={mode}
                                        type="radio"
                                        label={mode}
                                        name="trainingMode"
                                        value={mode}
                                        checked={formData.trainingMode === mode}
                                        onChange={handleChange}
                                    />
                                ))}
                            </div>
                        </Form.Group>

                        {/* Scope India Location */}
                        <Form.Group className="edit-lab fw-bold">
                            <Form.Label>Scope India Location</Form.Label>
                            <div className="d-flex flex-row gap-3">
                                {["Technopark TVM", "Thampanoor TVM", "Kochi", "Nagercoil", "Online"].map((location) => (
                                    <Form.Check
                                        key={location}
                                        type="radio"
                                        label={location}
                                        name="scopeIndiaLocation"
                                        value={location}
                                        checked={formData.scopeIndiaLocation === location}
                                        onChange={handleChange}
                                    />
                                ))}
                            </div>
                        </Form.Group>


                        {/*Preferred Training Timings*/}
                        <Form.Group className="edit-lab fw-bold">
                            <Form.Label>Preferred Training Timings</Form.Label>
                            <div>
                                {["Between 8am - 10am", "Between 9am - 1pm", "Between 1pm - 6pm", "Between 6pm - 10pm"].map((timing) => (
                                    <Form.Check
                                        key={timing}
                                        type="checkbox"
                                        label={timing}
                                        name="preferredTrainingTimings"
                                        value={timing}
                                        checked={formData.preferredTrainingTimings?.includes(timing) || false}
                                        onChange={(e) => {
                                            const selectedTimings = formData.preferredTrainingTimings || [];
                                            const updatedTimings = e.target.checked
                                                ? [...selectedTimings, timing] // Add selection
                                                : selectedTimings.filter(t => t !== timing); // Remove selection

                                            setFormData({ ...formData, preferredTrainingTimings: updatedTimings });
                                        }}
                                    />
                                ))}
                            </div>
                        </Form.Group>

                        {/* Address Field */}
                        <Form.Group className="edit-lab fw-bold">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter your address"
                            />
                        </Form.Group>

                        {/* Country Field */}
                        <Form.Group className="edit-lab fw-bold">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="Enter your country"
                            />
                        </Form.Group>

                        {/* State Field */}
                        <Form.Group className="edit-lab fw-bold">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="Enter your state"
                            />
                        </Form.Group>

                        {/* City Field */}
                        <Form.Group className="edit-lab fw-bold">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Enter your city"
                            />
                        </Form.Group>

                        {/* Pin Code Field */}
                        <Form.Group className="edit-lab fw-bold">
                            <Form.Label>Pin Code</Form.Label>
                            <Form.Control
                                type="number"
                                name="pinCode"
                                value={formData.pinCode}
                                onChange={handleChange}
                                placeholder="Enter your pin code"
                            />
                        </Form.Group>

                        <Form.Group className="edit-lab fw-bold">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control type="file" name="profilePicture" accept="image/*" onChange={handleChange} />
                        </Form.Group>



                        <div className="d-flex justify-content-center mt-3">
                            <Button variant="success" className="w-25" onClick={handleSave}>Save</Button>
                            <Button variant="secondary" className="ms-3 w-25"
                                onClick={() => navigate("/StudentDashboard", { state: { show: "profile" } })}>
                                Cancel
                            </Button>
                        </div>

                    </Form>
                </Container>
           

        </>
    );
};

export default EditProfile;
