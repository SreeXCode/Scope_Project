const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date },
  phone: {
    type: String
  },
  gender: {
    type: String,
    enum: ['Male', 'Female']
  },
  
  address: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  pinCode: { type: String },
  profilePicture: { type: String },
  role: { type: String,default: "admin"},
  otp: { type: String },
  otpExpires: { type: Date },
  isDefaultAdmin: { type: Boolean, default: false }, // 🔒 added field
  createdAt: {type: Date, default: Date.now} 

});

module.exports = mongoose.model("Admin", AdminSchema);

