const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
require("dotenv").config({ path: path.join(__dirname, "config/config.env") })

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// mongodb connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Successfully connected to MongoDB using Mongoose!"))
  .catch((err) => console.error("Connection error:", err));

//Models
const User = require('./models/userModel')  // User Model
const Courses = require('./models/coursesModel') // Courses Model
const Admin = require('./models/adminModel') // Admin Model

// Middlewares
const authenticateUser = require("./middlewares/authMiddleware"); // token Verifyer middleware
const isAdmin = require("./middlewares/adminAuth"); // token and role verifyer

// Define Storage for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});
app.use("/uploads", express.static("uploads"));
const upload = multer({ storage: storage }).single("profilePicture");  // ✅ Handles one file

// 1 )Register 
app.post("/register", upload, async (req, res) => {
  try {
    // ✅ Extract form fields from request body
    const {
      name, dateOfBirth, gender, educationalQualification, selectedCourse, mobileNumber, email, guardiansMobile,
      trainingMode, scopeIndiaLocation, guardiansName, guardiansOccupation, preferredTrainingTimings, address,
      country, state, city, pinCode, courses, // Ensure this is properly parsed
    } = req.body;

    // ✅ Handle profile picture upload
    const profilePicture = req.file ? req.file.filename : null;
    console.log("📸 Uploaded Profile Picture:", profilePicture);

    // ✅ Ensure `courses` is correctly formatted as an array
    let parsedCourses = [];
    if (courses) {
      try {
        parsedCourses = JSON.parse(courses);
        if (!Array.isArray(parsedCourses)) {
          throw new Error("Courses must be an array.");
        }
      } catch (err) {
        console.error("❌ Error parsing courses:", err.message);
        return res.status(400).json({ message: "Invalid courses format. Expected JSON array." });
      }
    }

    // ✅ Validate Required Fields
    if (!name || !email || !mobileNumber) {
      return res.status(400).json({ message: "Missing required fields: name, email, or mobile number." });
    }

    // ✅ Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // ✅ Create new user
    const newUser = new User({
      name, dateOfBirth, gender, educationalQualification, selectedCourse, mobileNumber, email, guardiansMobile,
      trainingMode, scopeIndiaLocation, guardiansName, guardiansOccupation, preferredTrainingTimings, address,
      country, state, city, pinCode, courses: parsedCourses, profilePicture: profilePicture, isFirstLogin: true,
    });

    // ✅ Save user to database
    await newUser.save();
    console.log("✅ User Registered Successfully:", newUser);

    res.status(201).json({ message: "User registered successfully." });

  } catch (error) {
    console.error("❌ Registration Error:", error.message);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});



// 2) First time Login - Generate OTP
const sendEmail = require("./utils/email");

app.post("/first-time-login", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Logs the full request body
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found with this email" });
    }

    // Ensure the user is logging in for the first time
    if (!user.isFirstLogin) {
      return res.status(400).json({ success: false, message: "User has already set a password" });
    }

    // Generate Secure OTP (6-digit)
    const otp = crypto.randomInt(100000, 999999).toString();

    // Hash the OTP before storing in the database
    HashedOtp = await bcrypt.hash(otp, 10);
    user.otp = HashedOtp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes
    await user.save();

    // Email Message
    const message = `
      <p>Dear User,</p>
      <p>Your OTP for setting your password is: <strong>${otp}</strong></p>
      <p>This OTP is valid for 5 minutes.</p>
      <p>If you did not request this email, please ignore it.</p>
    `;

    // Send OTP via Email
    await sendEmail({ email: user.email, subject: "Scope India Password Set", message });

    res.status(200).json({ success: true, message: "OTP sent successfully!" });

  } catch (error) {
    console.error("Error in First Time Login Generate OTP :", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});

// 3) OTP Verification

app.post("/otp-verify", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if OTP has expired
    if (!user.otp || !user.otpExpires || Date.now() > user.otpExpires) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // Compare the provided OTP with the hashed OTP in the database
    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // OTP is valid, clear it from the database
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ success: true, message: "OTP verified successfully" });

  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// 4) Set Password
app.post('/set-password', async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the password before saving

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Mark first login as complete
    user.isFirstLogin = false;

    await user.save();

    res.status(200).json({ success: true, message: "Password set successfully" });
  } catch (error) {
    console.error("Error setting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// 5) Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,   // Ensures the cookie is not accessible via JavaScript
      secure: true,     // Ensures cookies are only sent over HTTPS (disable this for localhost testing)
      sameSite: "None", // Cross-site requests need "None" and `secure: true`
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days

    });



    res.status(200).json({ success: true, message: "Login successful", token });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 6)Logout
app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // Set to `true` in production (HTTPS)
    sameSite: "Lax",
  });

  res.status(200).json({ message: "Logged out successfully" });
});


// Forgot Password
app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Generate Secure OTP (6-digit)
    const otp = crypto.randomInt(100000, 999999).toString();

    // Hash the OTP before storing in the database
    const hashedOtp = await bcrypt.hash(otp, 10);
    user.otp = hashedOtp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes
    await user.save();

    // Email Message
    const message = `
      <p>Dear User,</p>
      <p>You have requested to reset your password.</p>
      <p>Your OTP for password reset is: <strong>${otp}</strong></p>
      <p>This OTP is valid for 5 minutes.</p>
      <p>If you did not request this reset, please ignore this email.</p>
      <p>Best regards,<br>Your Support Team</p>
    `;

    // Send OTP via Email
    await sendEmail({ email: user.email, subject: "Scope India Forgot Password ", message });

    res.status(200).json({ success: true, message: "Forgot Password OTP sent successfully!" });
  } catch (error) {
    console.error("Error in forgot-password:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


// 8) Verify OTP and Reset Password
app.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, password, confirmPassword } = req.body;

    // Validate required fields
    if (!email || !otp || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // ✅ Added check
    }

    if (!user.otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Verify OTP
    const isOtpValid = await bcrypt.compare(otp, user.otp);
    if (!isOtpValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Hash new password
    user.password = await bcrypt.hash(password, 10);

    // Clear OTP fields after successful reset
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Error in reset-password:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////
// COURSES 

// 1) Admin Registration 
app.post("/admin/register",upload, async (req, res) => {
  try {
    const { name, email, password, dateOfBirth, phone, gender, address, city, state, country, pinCode } = req.body;
    
     // ✅ Handle profile picture upload
     const profilePicture = req.file ? req.file.filename : null;
     console.log("📸 Uploaded Profile Picture:", profilePicture);

    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if admin with the same email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      phone,
      gender,
      address,
      city,
      state,
      country,
      pinCode,
      profilePicture:profilePicture
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//Admin Login
app.post("/admin/login",async (req, res) => {
  try {

    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    console.log('admin',admin)
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // Validate password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.ADMIN_JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,   // Ensures the cookie is not accessible via JavaScript
      secure: true,     // Ensures cookies are only sent over HTTPS (disable this for localhost testing)
      sameSite: "None", // Cross-site requests need "None" and `secure: true`
      maxAge: 60 * 60 * 1000, // 1 hour

    });

    res.status(200).json({ message: "Login successful", role: admin.role ,token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

//Admin Logout
app.post("/admin/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  });

  res.status(200).json({ message: "Admin logged out successfully" });
});

//Admin Dashboard
app.get("/admin/dashboard", isAdmin, (req, res) => {
  res.status(200).json({ message: "Welcome to Admin Dashboard" });
});

//Admin Get Categories
app.get("/admin/get-categories", async (req, res) => {
  try {
    const categories = await Courses.find().distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories", error: error.message });
  }
});

//Add Courses ADMIN          
// Route to add a new course under a category
app.post("/admin/add-course",isAdmin, async (req, res) => {
  try {
    const { category, courses } = req.body; // Expecting `courses` as an array

    if (!category || !courses || !Array.isArray(courses)) {
      return res.status(400).json({ message: "Category and courses array are required" });
    }

    // Check if category already exists
    let existingCategory = await Courses.findOne({ category });

    if (existingCategory) {
      // Filter out duplicate courses
      const newCourses = courses.filter(
        (c) => !existingCategory.courses.some((existing) => existing.name === c.name)
      );

      if (newCourses.length > 0) {
        existingCategory.courses.push(...newCourses);
        await existingCategory.save();
        return res.status(200).json({ message: "Courses added to existing category", data: existingCategory });
      } else {
        return res.status(400).json({ message: "Courses already exist in this category" });
      }
    } else {
      // If category does not exist, create a new entry
      const newCategory = new Courses({ category, courses });
      await newCategory.save();
      return res.status(201).json({ message: "Category and courses added successfully", data: newCategory });
    }
  } catch (error) {
    console.error(error); // Debugging
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// DELETE /admin/remove-course/:category/:courseName
app.delete("/admin/remove-course/:category/:courseName", async (req, res) => {
  const { category, courseName } = req.params;
  console.log('category',category)
  console.log('courseName',courseName)

  try {
    const updated = await Courses.findOneAndUpdate(
      { category },
      { $pull: { courses: { name: courseName } } },
      { new: true }
    );
console.log('updated',updated)
    if (!updated) return res.status(404).json({ message: "Category or Course not found" });

    res.status(200).json({ message: "Course removed successfully", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove course", error: err.message });
  }
});

// DELETE /admin/remove-category/:category
app.delete("/admin/remove-category/:category", async (req, res) => {
  try {
    const result = await Courses.findOneAndDelete({ category: req.params.category });
    if (!result) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category removed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete category" });
  }
});

// Get Admin Profile
app.get("/admin/profile", isAdmin, async (req, res) => {
  try {
    console.log("Authenticated admin ID:", req.user); // Should log the ID from token

    const admin = await Admin.findById(req.user).select("-password"); // Exclude password
    console.log(admin);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    res.status(200).json({
      success: true,
      admin
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
});

// Update Admin Profile
app.put("/admin/profile", isAdmin, upload, async (req, res) => {
  try {
    const adminId = req.user; // Retrieved from token by isAdmin middleware

    // Destructure request body
    const {
      name,email,phone,gender,dateOfBirth,address,city,state,country,pinCode
    } = req.body;

    // Prepare update data
    const updateData = {
      name,email,phone,gender,dateOfBirth,address,city,state,country,pinCode
    };

    // If profile picture was uploaded, add it to updateData
    if (req.file?.filename) {
      updateData.profilePicture = req.file.filename;
    }

    // Find and update the admin
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      admin: updatedAdmin
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
});


// Admin Change Password
app.post("/admin/change-password",isAdmin,async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  console.log(req.body)

  try {
    const admin = await Admin.findById(req.user);
    console.log('admin',admin)
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const isSame = await bcrypt.compare(newPassword, admin.password);
    if (isSame) {
      return res
        .status(400)
        .json({ message: "New password cannot be same as the old password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    admin.password = hashedNewPassword;
    await admin.save();

    res.json({ message: "Password changed successfully" });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET all admins
app.get("/admin/all-admins",isAdmin, async (req, res) => {
  try {
    const admins = await Admin.find().select("-password"); // exclude passwords
    const count = admins.length;

    res.json({ success: true, count, admins });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// Remove Admins
app.delete("/remove/admin/:id",isAdmin, async (req, res) => {
  
  try {
    const admin = await Admin.findById(req.params.id);
    console.log('admin',admin)

    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    if (admin.isDefaultAdmin) {
      return res.status(403).json({ success: false, message: "Default admin cannot be removed" });
    }

    await Admin.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Admin removed successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// Admin Forgot Password
app.post("/admin/forgot-password",isAdmin, async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    admin.otp = hashedOtp;
    admin.otpExpires = Date.now() + 5 * 60 * 1000; // 5 min
    await admin.save();

    const message = `
      <p>Hello Admin,</p>
      <p>Your OTP for password reset is: <strong>${otp}</strong></p>
      <p>This is valid for 5 minutes.</p>
    `;

    await sendEmail({
      email: admin.email,
      subject: "Admin Password Reset OTP",
      message
    });

    res.status(200).json({ success: true, message: "OTP sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//Admin reset-password
app.post("/admin/reset-password",isAdmin, async (req, res) => {
  try {
    const { email, otp, password, confirmPassword } = req.body;

    if (!email || !otp || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    if (!admin.otp || admin.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const isOtpValid = await bcrypt.compare(otp, admin.otp);
    if (!isOtpValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    admin.password = await bcrypt.hash(password, 10);
    admin.otp = null;
    admin.otpExpires = null;
    await admin.save();

    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});









///////////////////////////////////////////////////////////////////////////////////////////////////////////
// STUDENT DASHBOARD 

// Get Student Dashboard page
app.get("/user/dashboard", authenticateUser, async (req, res) => {
  res.status(200).json({ message: "Authorized", user: req.user });
});

// User Change Password
app.post("/user/change-password", authenticateUser, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  console.log(currentPassword,newPassword)

  try {
    const user = await User.findById(req.user);
    console.log('user',user)

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Optional: Check if new password is same as old one
    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return res
        .status(400)
        .json({ message: "New password cannot be same as the old password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});




// Get User Profile
app.get("/user/profile", authenticateUser, async (req, res) => {
  try {
    console.log("Authenticated user ID:", req.user); // Debugging Log

    const user = await User.findById(req.user).select("-password"); // Exclude password field
    console.log(user)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
});

// ✅ Update user profile
app.put("/user/profile", authenticateUser,upload,async (req, res) => {
  try {
    console.log('update req body',req.body)
    const { name,dateOfBirth,gender,educationalQualification,mobileNumber,email,guardiansName,
      guardiansMobile,guardiansOccupation,trainingMode,scopeIndiaLocation,preferredTrainingTimings,
      address,country, state, city, pinCode,
    } = req.body;

    const profilePicture = req.file?.filename;
    console.log("profilePicture", profilePicture);


    // Find user by ID
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Update fields
    user.name = name 
    user.dateOfBirth = dateOfBirth
    user.gender = gender
    user.educationalQualification = educationalQualification
    user.mobileNumber = mobileNumber
    user.email = email 
    user.guardiansName = guardiansName
    user.guardiansMobile = guardiansMobile
    user.guardiansOccupation = guardiansOccupation
    user.trainingMode = trainingMode
    user.scopeIndiaLocation = scopeIndiaLocation
    user.preferredTrainingTimings = preferredTrainingTimings
    user.address = address
    user.country = country
    user.state  = state
    user.city = city
    user.pinCode = pinCode

    if (profilePicture) {
      user.profilePicture = profilePicture; // ✅ Save new profile picture filename
    }

    // Save updated user
    await user.save();

    res.status(200).json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});


// Get all courses from Courses Collection
app.get("/courses", async (req, res) => {
  try {
    const courses = await Courses.find();
    return res.status(200).json({ message: "Courses retrieved successfully", data: courses });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Enroll User in Course
// ✅ Enroll User in Course
app.post('/enroll', authenticateUser, async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user

  console.log("courseId:", courseId)
  console.log("userId:", userId)

  try {
    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate course existence
    const courseCategory = await Courses.findOne({ "courses._id": courseId }, { "courses.$": 1 });
    if (!courseCategory) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const course = courseCategory.courses[0];

    // Check if user is already enrolled
    if (user.courses.some(c => c._id.toString() === courseId)) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }

    // Enroll user in the course
    user.courses.push({
      _id: course._id,
      name: course.name,
      fees: course.fees,
      duration: course.duration
    });

    await user.save();

    res.json({ message: 'Course enrolled successfully!', user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Enrollment failed', error });
  }
});

// Remove Entroll
// ✅ Unenroll User from Course
app.post('/remove-enroll', authenticateUser, async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user;

  console.log("courseId:", courseId)
  console.log("userId:", userId)

  try {
    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is enrolled in the course
    const enrolledCourseIndex = user.courses.findIndex(c => c._id.toString() === courseId);
    if (enrolledCourseIndex === -1) {
      return res.status(400).json({ message: 'You are not enrolled in this course' });
    }
    console.log('enrolledCourseIndex', enrolledCourseIndex)

    // Remove the course from the user's enrolled courses
    user.courses.splice(enrolledCourseIndex, 1);  // stratIndex, Deleted Count

    await user.save();

    res.json({ message: 'Course unenrolled successfully!', user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unenrollment failed', error });
  }
});

// Get All Users
app.get("/all-users",isAdmin,async (req, res) => {
  try {
 
    const users = await User.find().select("-password"); // Exclude passwords
    res.status(200).json({
      success: true,
      users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message
    });
  }
});

// Remove user by ID - Access Admin
app.delete('/remove/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting user', error: error.message });
  }
});












app.listen(5000, () => console.log("Server running on port 5000"));
