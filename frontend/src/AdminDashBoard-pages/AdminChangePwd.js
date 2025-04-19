import { useState } from "react";
import axios from "axios";
import "../styles/ChangePassword.css";

const AdminChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  console.log(currentPassword, newPassword, confirmNewPassword,message)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/admin/change-password",
        { currentPassword, newPassword }, { withCredentials: true }

      );
      setMessage(res.data.message);

      // ✅ Clear the input fields on success
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");

    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card p-4 shadow rounded-2" style={{ width: "100%", maxWidth: "500px" }}>
        <h3 className="text-center mb-4 fnt-style">🔒 Change Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fnt-style">Current Password</label>
            <input
              type="password"
              className="form-control"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fnt-style">New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fnt-style">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 fnt-style">
            Update Password
          </button>
          {message && (
            <div className="mt-3 text-center text-danger  fnt-style">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminChangePassword;
