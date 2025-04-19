import React, { useState, useRef } from "react";
import axios from "axios";

const AdminRegister = () => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    phone: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.files[0], // Store the file object
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();


    // Append all fields dynamically
    Object.entries(formData).forEach(([key, value]) => {
      const formattedValue = (key === "courses") ? JSON.stringify(value) : value;
      data.append(key, formattedValue);
    });


    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const payload = { ...formData };
      delete payload.confirmPassword;

      const res = await axios.post("http://localhost:5000/admin/register", data, {
        withCredentials: true
      });

      alert("Registration successful!");

      // 🔄 Clear form after success
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        phone: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        profilePicture:null,
      });
      fileInputRef.current.value = null; // ✅ Clear the file input


    } catch (error) {
      console.error(error);

      // ✅ Show backend message to user
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Registration failed.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded-4">
        <h3 className="text-center mb-4 Profile">Admin Registration</h3>
        <form onSubmit={handleSubmit} className="Profile">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} className="form-control border-black rounded-0" required onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} className="form-control border-black rounded-0" required onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Password</label>
              <input type="password" name="password" value={formData.password} className="form-control border-black rounded-0" required onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} className="form-control border-black rounded-0" required onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Date of Birth</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} className="form-control border-black rounded-0" onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label>Phone</label>
              <input type="text" name="phone" value={formData.phone} className="form-control border-black rounded-0" onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Gender</label>
              <select
                name="gender"
                className="form-select border-black rounded-0"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label>Address</label>
              <input type="text" name="address" value={formData.address} className="form-control border-black rounded-0" onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-3 mb-3">
              <label>City</label>
              <input type="text" name="city" value={formData.city} className="form-control border-black rounded-0" onChange={handleChange} />
            </div>
            <div className="col-md-3 mb-3">
              <label>State</label>
              <input type="text" name="state" value={formData.state} className="form-control border-black rounded-0" onChange={handleChange} />
            </div>
            <div className="col-md-3 mb-3">
              <label>Country</label>
              <input type="text" name="country" value={formData.country} className="form-control border-black rounded-0" onChange={handleChange} />
            </div>
            <div className="col-md-3 mb-3">
              <label>Pin Code</label>
              <input type="text" name="pinCode" value={formData.pinCode} className="form-control border-black rounded-0" onChange={handleChange} />
            </div>

            <div className="col-md-12 mb-3">
              <label htmlFor="imageUpload" className="form-label lab">
                Upload Profile Picture
              </label>
              <input
                type="file"
                className="form-control border-black rounded-0"
                id="profilePicture"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}


              />
            </div>

          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success px-5">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
