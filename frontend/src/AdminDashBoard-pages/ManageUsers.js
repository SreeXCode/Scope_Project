import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users on component mount
  useEffect(() => {
    axios.get("http://localhost:5000/all-users", {
      withCredentials: true
    })
      .then(res => {
        if (res.data.success) {
          setUsers(res.data.users);
        }
      })
      .catch(err => {
        console.error("Error fetching users:", err);
      });
  }, []);
  

  // Remove user handler
  const handleRemove = (userId) => {
    console.log(userId)
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    axios.delete(`http://localhost:5000/remove/user/${userId}`) // You need to create this backend route
      .then(res => {
        if (res.data.success) {
          // Remove user from local state
          setUsers(users.filter(user => user._id !== userId));
        }
      })
      .catch(err => {
        console.error("Error deleting user:", err);
      });
  };

  return (
    <div className="container mt-4">
      <h4 className="Profile">All Users</h4>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>S No</th>
            <th>Name</th>
            <th>email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(user._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
