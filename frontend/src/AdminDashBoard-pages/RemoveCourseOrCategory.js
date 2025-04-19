import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Alert, Spinner } from "react-bootstrap";

export default function RemoveCourseOrCategory () {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  console.log('courses',courses)
  console.log('selectedCategory',selectedCategory)

  // Fetch all categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/get-categories", { withCredentials: true });
      setCategories(res.data);
    } catch (err) {
      setMessage("Failed to fetch categories");
    }
  };

  const fetchCourses = async (category) => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/courses", { withCredentials: true });
  
      // Find the matching category's course list
      const categoryObj = res.data.data.find(item => item.category === category);
      setCourses(categoryObj ? categoryObj.courses : []);
    } catch (err) {
      setMessage("Failed to load courses");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };
  

  const handleCategorySelect = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category) {
      fetchCourses(category);
    } else {
      setCourses([]);
    }
  };

  const removeCourse = async (courseName) => {
    try {
      await axios.delete(`http://localhost:5000/admin/remove-course/${selectedCategory}/${courseName}`, 
        { withCredentials: true });
      setCourses(courses.filter((c) => c.name !== courseName));
      setMessage(`Course "${courseName}" removed`);
    } catch (err) {
      setMessage("Failed to remove course");
    }
  };

  const removeCategory = async () => {
    try {
      await axios.delete(`http://localhost:5000/admin/remove-category/${selectedCategory}`,
         { withCredentials: true });
      setMessage(`Category "${selectedCategory}" removed`);
      setSelectedCategory("");
      setCourses([]);
      fetchCategories();
    } catch (err) {
      setMessage("Failed to remove category");
    }
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">Manage Courses and Categories</h3>

      {message && <Alert variant="info">{message}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Select a Category</Form.Label>
        <Form.Select value={selectedCategory} onChange={handleCategorySelect}>
          <option value="">-- Select Category --</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </Form.Select>
      </Form.Group>

      {selectedCategory && (
        <div className="mb-3">
          <Button variant="danger" onClick={removeCategory}>
            Delete Entire Category
          </Button>
        </div>
      )}

      {loading ? (
        <Spinner animation="border" />
      ) : (
        courses.length > 0 && (
          <Table striped bordered hover>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Fees</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, idx) => (
                <tr key={course._id}>
                  <td>{idx + 1}</td>
                  <td>{course.name}</td>
                  <td>₹{course.fees}</td>
                  <td>{course.duration}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeCourse(course.name)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )
      )}
    </div>
  );
}
