import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddCourses() {
  const [existingCategories, setExistingCategories] = useState([]);
  const [useNewCategory, setUseNewCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [courses, setCourses] = useState([{ name: "", fees: "", duration: "" }]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/get-categories", { withCredentials: true })
      .then((res) => setExistingCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);
  

  const handleCourseChange = (index, e) => {
    const updated = [...courses];
    updated[index][e.target.name] = e.target.value;
    setCourses(updated);
  };

  const addCourseField = () => {
    setCourses([...courses, { name: "", fees: "", duration: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = useNewCategory ? newCategory : selectedCategory;
  
    try {
      const res = await axios.post(
        "http://localhost:5000/admin/add-course",
        {
          category,
          courses: courses.map((c) => ({
            name: c.name,
            fees: parseInt(c.fees),
            duration: c.duration,
          })),
        },
        {
          withCredentials: true, // ✅ Must be in the config object (3rd argument)
        }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error submitting form");
    }
  };
  

  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="card-title mb-4">Add Course to Category</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Choose Category</label>
              <div className="d-flex flex-column flex-md-row gap-3">
                <select
                  disabled={useNewCategory}
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">-- Select Existing Category --</option>
                  {existingCategories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="form-check mt-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={useNewCategory}
                    onChange={() => {
                      setUseNewCategory(!useNewCategory);
                      setSelectedCategory("");
                      setNewCategory("");
                    }}
                    id="newCategoryCheck"
                  />
                  <label className="form-check-label" htmlFor="newCategoryCheck">
                    New
                  </label>
                </div>
              </div>
              {useNewCategory && (
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Enter new category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  required
                />
              )}
            </div>

            {courses.map((course, index) => (
              <div key={index} className="border rounded p-3 mb-3 bg-light">
                <h5 className="mb-3">Course {index + 1}</h5>
                <div className="row g-3">
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Course Name"
                      value={course.name}
                      onChange={(e) => handleCourseChange(index, e)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      name="fees"
                      className="form-control"
                      placeholder="Fees"
                      value={course.fees}
                      onChange={(e) => handleCourseChange(index, e)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="duration"
                      className="form-control"
                      placeholder="Duration"
                      value={course.duration}
                      onChange={(e) => handleCourseChange(index, e)}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-between align-items-center mb-4">
              <button
                type="button"
                onClick={addCourseField}
                className="btn btn-outline-success"
              >
                + Add Another Course
              </button>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>

            {message && (
              <div className="alert alert-info mt-4" role="alert">
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
