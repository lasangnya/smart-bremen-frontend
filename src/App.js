// import React from "react";
// import { Link, Routes, Route, useNavigate } from "react-router";
// import { SmartBremenMap } from "./Map";
// import { Header, Footer } from "./HeaderFooter";
// import { ProfileSettings } from "./Profile";
// import { Login } from "./Authentication";
// import { AddNewLocation, EditLocation } from "./Location";
// import Featured from "./components/Featured";
// import Button from "./components/Button";
// import MapView from "./components/MapView";

// const Landing = () => {
//   const navigate = useNavigate();

//   const handleContactUsClick = () => {
//     navigate("/contactus");
//   };

//   return (
//     <div className="app-container">
//       <Header />
//       <MapView />
//       <SmartBremenMap />
//       <Featured />
//       <div className="app-content"></div>
//       <div
//         style={{
//           textAlign: "center",
//           margin: "20px 0",
//           fontFamily: "CircularStd",
//           fontWeight: "700",
//           color: "var(--secondary)",
//           fontSize: "25px",
//         }}
//       >
//         Like to get featured?
//       </div>
//       <div className="button-container">
//         <Button text="CONTACT US" onClick={handleContactUsClick} />
//       </div>
//       <Footer />
//     </div>
//     // <main className="flex-grow flex flex-col items-center py-8 ">
//     //   <MapView />
//     //   <Featured />
//     //   <div className="app-content"></div>
//     //   <div
//     //     style={{
//     //       textAlign: "center",
//     //       margin: "20px 0",
//     //       fontFamily: "CircularStd",
//     //       fontWeight: "700",
//     //       color: "var(--secondary)",
//     //       fontSize: "25px",
//     //     }}
//     //   >
//     //     Like to get featured?
//     //   </div>
//     //   <div className="button-container">
//     //     <Button text="CONTACT US" onClick={handleContactUsClick} />
//     //   </div>
//     //   <div className="w-full max-w h-[80vh]">
//     //     <div className="w-full h-full rounded-md ">
//     //       {/* <SmartBremenMap /> */}
//     //     </div>
//     //   </div>

//     //   <section className="mt-8 px-4 max-w-3xl">
//     //     <h2 className="text-2xl font-semibold mb-4">About This Map</h2>
//     //     <p className="text-gray-700">
//     //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id
//     //       sapien eget felis fermentum aliquam. Integer consequat erat quis
//     //       libero euismod, a tincidunt nisi consectetur.
//     //     </p>
//     //     <p className="text-gray-700 mt-4">
//     //       Praesent consequat metus in velit tristique, quis malesuada felis
//     //       tempor. Curabitur vitae leo nec mi vehicula dictum sit amet nec
//     //       ligula.
//     //     </p>
//     //   </section>
//     // </main>
//   );
// };

// function Home() {
//   return <h1>Home Page</h1>;
// }
// function About() {
//   return <h1>About Page</h1>;
// }
// function Contact() {
//   return <h1>Contact Page</h1>;
// }

// function App() {
//   return (
//     <>
//       <Header />
//       <div className="App">
//         <div className="flex flex-col min-h-screen bg-gray-140">
//           <nav className="p-5">
//             <Link className="px-5" to="/">
//               Landing
//             </Link>
//             <Link className="px-5" to="/about">
//               About
//             </Link>
//             <Link className="px-5" to="/contact">
//               Contact
//             </Link>
//             <Link className="px-5" to="/profileSettings">
//               Profile Settings
//             </Link>
//             <Link className="px-5" to="/login">
//               Login
//             </Link>
//             <Link className="px-5" to="/addNewLocation">
//               Add new Location
//             </Link>
//             <Link className="px-5" to="/editLocation">
//               editLocation
//             </Link>
//           </nav>
//           <Routes>
//             <Route path="/" element={<Landing />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/profileSettings" element={<ProfileSettings />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/addNewLocation" element={<AddNewLocation />} />
//             <Route path="/editLocation" element={<EditLocation />} />
//           </Routes>
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
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

      {/* <Route path={routes.login} element={<Login />} /> */}

      {/* About Us route */}
      <Route path={routes.aboutUs} element={<AboutUs />} />

      {/* Login Page route */}
      <Route path={routes.loginPage} element={<LoginPage />} />

      {/* Signup route */}
      <Route path={routes.signupPage} element={<SignupPage />} />

      {/* Dashboard route */}
      <Route path={routes.dashboard} element={<Dashboard />} />
    </Routes>
  );
};

export default AppWrapper;
