import React, { useState } from "react";
import AddNewLocation from "../components/AddNewLocation";
import Header from "../components/BackHeader";
import Footer from "../../components/Footer";
import './dashboard.css';

function Dashboard() {
  const [activeSection, setActiveSection] = useState("AddNewLocation");

  const renderSection = () => {
    switch (activeSection) {
      case "AddNewLocation":
        return <AddNewLocation />;
      case "EditExistingLocation":
        return <div>Edit Existing Location</div>;
      case "History":
        return <div>History</div>;
      case "ProfileSettings":
        return <div>Profile Settings</div>;
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
              className={activeSection === "EditExistingLocation" ? "active" : ""}
              onClick={() => setActiveSection("EditExistingLocation")}
            >
              Edit Existing Location
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