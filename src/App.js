import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from "./components/Button";
import Featured from "./components/Featured";
import MapView from "./components/MapView";
import ContactUs from "./pages/ContactUs";
import LoginPage from "./backend/pages/LoginPage";
import Dashboard from "./backend/pages/Dashboard";
import SignupPage from "./backend/pages/SignupPage";
import "./styles/colors.css";
import "./App.css";
import routes from "./routes";
import AboutUs from "./pages/AboutUs";
import SmartBremenMap from "./Map";
import AddNewLocation from "./backend/components/AddNewLocation";
import EditLocation from "./backend/components/EditLocation";

const App = () => {
  const navigate = useNavigate();

  const handleContactUsClick = () => {
    navigate("/contactus");
  };

  return (
    <div className="app-container">
      <Header />
      {/* <MapView /> */}
      <div className="w-full max-w">
        <div className="w-full rounded-md ">
          <SmartBremenMap />
        </div>
      </div>
      <Featured />
      <div className="app-content"></div>
      <div
        style={{
          textAlign: "center",
          margin: "20px 0",
          fontFamily: "CircularStd",
          fontWeight: "700",
          color: "var(--secondary)",
          fontSize: "25px",
        }}
      >
        Like to get featured?
      </div>
      <div className="button-container">
        <Button text="CONTACT US" onClick={handleContactUsClick} />
      </div>
      <Footer />
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route path={routes.home} element={<App />} />

      {/* Contact Us route */}
      <Route path={routes.contactUs} element={<ContactUs />} />

      {/* About Us route */}
      <Route path={routes.aboutUs} element={<AboutUs />} />

      {/* Login Page route */}
      <Route path={routes.loginPage} element={<LoginPage />} />

      {/* Signup route */}
      <Route path={routes.signupPage} element={<SignupPage />} />

      {/* Dashboard route */}
      <Route path={routes.dashboard} element={<Dashboard />} />

      {/* Dashboard route */}
      <Route path={routes.addNewLocation} element={<AddNewLocation />} />

      <Route path={routes.editLocation} element={<EditLocation />} />
    </Routes>
  );
};

export default AppWrapper;
