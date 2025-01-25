import React, { useState } from "react";
import AddNewLocation from "../components/AddNewLocation";
import UserRequests from "../components/UserRequests";
import PostRequests from "../components/PostRequests";
import Users from "../components/Users";
import Header from "../components/BackHeader";
import Footer from "../../components/Footer";
import "./dashboard.css";
import { useLocation } from "react-router-dom";
import { marker } from "leaflet";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("AddNewLocation");
  const location = useLocation();
  const { markerPosition } = location.state || {}; // Access the state data

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
          </ul>
        </nav>
        <main className="content">{renderSection()}</main>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
