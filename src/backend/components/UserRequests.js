import React, { useState } from "react";
import userRequestsData from "../data/userRequests.json";
import "./userrequests.css";

function UserRequests() {
  const [userRequests, setUserRequests] = useState(userRequestsData);
  const [expandedRow, setExpandedRow] = useState(null);

  const handleReview = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="user-requests">
      {userRequests.map((user) =>
        expandedRow === user.id ? (
          <div key={user.id} className="user-row-expanded">
            <div className="row-actions">
              <button
                className="remove-link"
                onClick={() => {
                  const updatedRequests = userRequests.filter(
                    (req) => req.id !== user.id
                  );
                  setUserRequests(updatedRequests);
                  setExpandedRow(null);
                }}
              >
                Remove
              </button>
              <button
                className="approve-button"
                onClick={() => {
                  console.log("Approve clicked for user", user.id);
                }}
              >
                Approve
              </button>
            </div>
            <div className="row-details">
              <div className="row-detail-item">
                <strong>Name:</strong> <span>{user.name}</span>
              </div>
              <div className="row-detail-item">
                <strong>Email Address:</strong> <span>{user.email}</span>
              </div>
              <div className="row-detail-item">
                <strong>Date and Time:</strong>{" "}
                <span>
                  {user.date} {user.time}
                </span>
              </div>
              <div className="row-detail-item">
                <strong>Role:</strong>
                <select>
                  <option value="Maintainer">Maintainer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="row-detail-item">
                <strong>Password:</strong>
                <input type="text" defaultValue={user.password} />
              </div>
            </div>
          </div>
        ) : (
          <div key={user.id} className="user-row">
            <div className="row-header">
              <span>{user.name}</span>
              <span>{user.date}</span>
              <span>{user.email}</span>
              <button
                className="review-button"
                onClick={() => handleReview(user.id)}
              >
                Review
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default UserRequests;
