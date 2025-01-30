import React, { useState, useEffect } from "react";
import axios from "axios";
import "./users.css";
import { API_BASE_URL } from "../../routes";

function Users() {
  const [users, setUsers] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleReview = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleInputChange = (id, field, value) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, [field]: field === "role_id" ? Number(value) : value }
          : user
      )
    );
  };

  const handleSave = async (user) => {
    try {
      const updatedUser = { ...user, role_id: Number(user.role_id) }; // Ensure role_id is a number
      await axios.put(`${API_BASE_URL}/api/users/${user.id}`, updatedUser);
      // alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      // alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="users-section">
      {users.map((user) => (
        <div key={user.id} className="user-row">
          {expandedRow === user.id ? (
            <div className="user-row-expanded">
              <div className="row-actions">
                <button
                  className="remove-link"
                  onClick={() => handleDelete(user.id)}
                >
                  Remove
                </button>
                <button
                  className="save-button"
                  onClick={() => handleSave(user)}
                >
                  Save
                </button>
              </div>
              <div className="row-details">
                <div className="row-detail-item">
                  <strong>Name:</strong>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) =>
                      handleInputChange(user.id, "name", e.target.value)
                    }
                  />
                </div>
                <div className="row-detail-item">
                  <strong>Email Address:</strong>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      handleInputChange(user.id, "email", e.target.value)
                    }
                  />
                </div>
                <div className="row-detail-item">
                  <strong>Role:</strong>
                  <select
                    value={user.role_id}
                    onChange={(e) =>
                      handleInputChange(user.id, "role_id", e.target.value)
                    }
                  >
                    <option value="2">Artist</option>
                    <option value="1">Admin</option>
                  </select>
                </div>
                {/* <div className="row-detail-item">
                  <strong>Password:</strong>
                  <input
                    type="text"
                    value={user.password || ""}
                    onChange={(e) =>
                      handleInputChange(user.id, "password", e.target.value)
                    }
                  />
                </div> */}
              </div>
            </div>
          ) : (
            <div className="row-header">
              <span>{user.name}</span>
              <span>{user.role}</span>
              <span>{user.email}</span>
              <button
                className="review-button"
                onClick={() => handleReview(user.id)}
              >
                Review
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Users;
