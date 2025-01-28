import React, { useState } from "react";
import axios from "axios";
import AddNewLocation from "../components/AddNewLocation";
import UserRequests from "../components/UserRequests";
import PostRequests from "../components/PostRequests";
import Users from "../components/Users";
import Header from "../components/BackHeader";
import Footer from "../../components/Footer";
import "./dashboard.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import routes from "../../routes";
import { marker } from "leaflet";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("AddNewLocation");
  const location = useLocation();
  const navigate = useNavigate();
  const { token, user, logout } = useAuth();
  const { markerPosition } = location.state || {}; // Access the state data

  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        await axios.post(
          "http://127.0.0.1:8082/api/auth/logout",
          {},
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
      }
      logout();
    } catch (err) {
      console.error("Logout error:", err.response?.data || err.message);
    }
    navigate(routes.loginPage);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "AddNewLocation":
        return <AddNewLocation markerPosition={markerPosition} />;
      case "EditExistingLocation":
        return <div>Edit Existing Location</div>;
      case "UserRequests":
        return <UserRequests />;
      case "PostRequests":
        return <PostRequests />;
      case "Users":
        return <Users />;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-container">
        <nav className="sidebar">
          <ul>
            <li
              className={activeSection === "AddNewLocation" ? "active" : ""}
              onClick={() => setActiveSection("AddNewLocation")}
            >
              Add New Location
            </li>
            <li
              className={
                activeSection === "EditExistingLocation" ? "active" : ""
              }
              onClick={() => setActiveSection("EditExistingLocation")}
            >
              Edit Existing Location
            </li>
            {user.role_id === 1 && (
              <>
                <li
                  className={activeSection === "UserRequests" ? "active" : ""}
                  onClick={() => setActiveSection("UserRequests")}
                >
                  User Requests
                </li>
                <li
                  className={activeSection === "PostRequests" ? "active" : ""}
                  onClick={() => setActiveSection("PostRequests")}
                >
                  Post Requests
                </li>
                <li
                  className={activeSection === "Users" ? "active" : ""}
                  onClick={() => setActiveSection("Users")}
                >
                  Users
                </li>
              </>
            )}
          </ul>
          <div className="logout-button-container">
            <p className="token-text">You are logged in with token: {token}</p>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>
        <main className="content">{renderSection()}</main>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
