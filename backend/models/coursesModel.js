const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    category: { type: String, required: true, unique: true }, // ✅ Unique category
    courses: [{
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        name: { type: String, required: true }, // ✅ Course name
        fees: { type: Number, required: true }, // ✅ Course fees (Number)
        duration: { type: String, required: true } // ✅ Duration (e.g., "3 months", "6 weeks")
    }],
    createdAt: { type: Date, default: Date.now } 
});

module.exports = mongoose.model("Courses", CourseSchema);


// Mogodb shell path 
// C:\Users\SREE 721\AppData\Local\Programs\mongosh\  