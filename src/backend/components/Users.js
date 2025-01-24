import React, { useState } from "react";
import usersData from "../data/users.json";
import "./users.css";

function Users() {
  const [users, setUsers] = useState(usersData);
  const [expandedRow, setExpandedRow] = useState(null);

  const handleReview = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleInputChange = (id, field, value) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, [field]: value } : user
      )
    );
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
                  onClick={() => {
                    const updatedUsers = users.filter((u) => u.id !== user.id);
                    setUsers(updatedUsers);
                    setExpandedRow(null);
                  }}
                >
                  Remove
                </button>
                <button
                  className="save-button"
                  onClick={() => console.log("Save clicked for", user.id)}
                >
                  Save
                </button>
              </div>
              <div className="row-details">
                <div className="row-detail-item">
                  <strong>Name:</strong>
                  <span>{user.name}</span> 
                </div>
                <div className="row-detail-item">
                  <strong>Email Address:</strong>
                  <span>{user.email}</span>
                </div>
                <div className="row-detail-item">
                  <strong>Role:</strong>
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleInputChange(user.id, "role", e.target.value)
                    }
                  >
                    <option value="Maintainer">Maintainer</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="row-detail-item">
                  <strong>Password:</strong>
                  <input
                    type="text"
                    value={user.password}
                    onChange={(e) =>
                      handleInputChange(user.id, "password", e.target.value)
                    }
                  />
                </div>
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
