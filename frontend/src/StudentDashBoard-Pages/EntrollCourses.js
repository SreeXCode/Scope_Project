import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/EntrollCourses.css';
import Header from '../components/Header';
import FooterRegisterAndContact from "../components/Footer-Reg&Contact";

const EntrollCourses = () => {
    const [availableCourses, setAvailableCourses] = useState([]); // ✅ Fixed state name
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:5000/courses",  { withCredentials: true });

                console.log("Courses API Response:", response.data.data);

                if (response.data && Array.isArray(response.data.data)) {
                    setAvailableCourses(response.data.data); // ✅ Fixed setter function
                } else {
                    setAvailableCourses([]); // Handle empty array case
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setError(error.response?.data?.message || "Failed to fetch courses");
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // ✅ Define handleEnroll inside the component
    const handleEnroll = async (courseId) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/enroll",
                { courseId }, 
                { withCredentials: true }
            );

            console.log("Enroll Response:", response.data);
            alert(response.data.message);

        } catch (error) {
            console.error("Enrollment Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Enrollment failed");
        }
    };

    if (loading) return <p className="text-center text-primary fw-bold fs-5">Loading courses...</p>;
    if (error) return <p className="text-center text-danger fw-bold">{error}</p>;

    return (
        <>
            <div className="container mt-4">
                <h2 className="text-center fw-bold Available-Courses">Available Courses</h2>

                {availableCourses.length > 0 ? (
                    availableCourses.map((category) => (
                        <div key={category._id} className="mb-5">
                            <h3 className="fw-semibold category">{category.category}</h3>

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
                                        {category.courses.map((course) => (
                                            <tr key={course._id} className="tabledata">
                                                <td>{course.name}</td>
                                                <td className="text-center">{course.duration}</td>
                                                <td className="text-center">₹{course.fees}</td>
                                                <td className="text-center">
                                                    <button
                                                        onClick={() => handleEnroll(course._id)}
                                                        className="btn btn-success btn-sm"
                                                    >
                                                        Enroll
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted">No courses available</p>
                )}
            </div>
        </>
    );
};

export default EntrollCourses;
