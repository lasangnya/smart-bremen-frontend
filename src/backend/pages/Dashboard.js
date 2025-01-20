import React, { useState } from "react";
import AddNewLocation from "../components/AddNewLocation";
import Header from "../components/Header";
import Footer from "../../components/Footer";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("AddNewLocation");

  const renderSection = () => {
    switch (activeSection) {
      case "AddNewLocation":
        return <AddNewLocation />;
    }
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-container">
        <nav className="sidebar">
          <ul>
            <li onClick={() => setActiveSection("AddNewLocation")}>Add New Location</li>
            <li onClick={() => setActiveSection("EditExistingLocation")}>Edit Existing Location</li>
            <li onClick={() => setActiveSection("History")}>History</li>
            <li onClick={() => setActiveSection("ProfileSettings")}>Profile Settings</li>
          </ul>
        </nav>
        <main className="content">{renderSection()}</main>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
