import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/admin/all-admins", { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          setAdmins(res.data.admins);
        }
      })
      .catch(err => {
        console.error("Error fetching admins:", err);
      });
  }, []);

  const handleRemove = (adminId) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    axios.delete(`http://localhost:5000/remove/admin/${adminId}`)
      .then(res => {
        if (res.data.success) {
          setAdmins(admins.filter(admin => admin._id !== adminId));
        } else {
          alert(res.data.message); // for cases like default admin
        }
      })
      .catch(err => {
        console.error("Error deleting admin:", err);
        alert("Something went wrong while deleting.");
      });
  };

  return (
    <div className="container mt-4">
      <h4 className="Profile">All Admins</h4>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>S No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.length > 0 ? (
            admins.map((admin, index) => (
              <tr key={admin._id}>
                <td>{index + 1}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>
                  {!admin.isDefaultAdmin ? (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(admin._id)}
                    >
                      Remove
                    </button>
                  ) : (
                    <span className="text-muted">Super Admin</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No admins found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAdmins;
