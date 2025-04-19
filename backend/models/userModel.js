const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Please enter date of birth']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: [true, 'Please select gender']
    },
    educationalQualification: {
        type: String,
        required: [true, 'Please enter educational qualification']
    },
    courses: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Courses" }, // Reference Course ID
        name: String, 
        fees: Number, 
        duration: String
    }],
    mobileNumber: {
        type: String,
        required: [true, 'Please enter mobile number'],
        match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number']
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    guardiansMobile: {
        type: String,
        required: [true, "Please enter Guardian's mobile number"],
        match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number']
    },
    trainingMode: {
        type: String,
        enum: ['Live Online', 'Class Room'],
        required: [true, 'Please select training mode']
    },
    scopeIndiaLocation: {
        type: String,
        enum: ['Technopark TVM', 'Thampanoor TVM', 'Kochi', 'Nagercoil', 'Online'],
        required: [true, 'Please select SCOPE INDIA location']
    },
    guardiansName: {
        type: String,
        required: [true, "Please enter Guardian's name"]
    },
    guardiansOccupation: {
        type: String,
        required: [true, "Please enter Guardian's occupation"]
    },
    preferredTrainingTimings: {
        type: [String], // Array to store multiple selected options
        enum: ['Between 8am - 10am', 'Between 9am - 1pm', 'Between 1pm - 6pm', 'Between 6pm - 10pm'],
        required: [true, 'Please select at least one preferred training timing']
    },
    address: {
        type: String,
        required: [true, 'Please enter address']
    },
    country: {
        type: String,
        required: [true, 'Please enter country']
    },
    state: {
        type: String,
        required: [true, 'Please enter state']
    },
    city: {
        type: String,
        required: [true, 'Please enter city']
    },
    pinCode: {
        type: String,
        required: [true, 'Please enter PIN/Zip Code'],
        match: [/^\d{5,6}$/, 'Please enter a valid PIN/Zip Code']
    },
    profilePicture: { type: String }, // Stores only filename, not full path
    otp: { type: String }, // Stores OTP for verification
    otpExpires: { type: Date }, // OTP expiration time
    password: { type: String }, // Stores hashed password after setting
    isFirstLogin: { type: Boolean }, // Indicates first-time login
    createdAt: {type: Date, default: Date.now} //Automatically sets the current timestamp
});

module.exports = mongoose.model("User", userSchema);
