import React from "react";
import { Link, Routes, Route } from "react-router";
import { SmartBremenMap } from "./Map";
import { Header, Footer } from "./HeaderFooter";
import { ProfileSettings } from "./Profile";
import { Login } from "./Authentication";
import { AddNewLocation, EditLocation } from "./Location";

const Landing = () => {
  return (
    <main className="flex-grow flex flex-col items-center py-8 ">
      <div className="w-full max-w h-[80vh]">
        <div className="w-full h-full rounded-md ">
          <SmartBremenMap />
        </div>
      </div>

      <section className="mt-8 px-4 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About This Map</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id
          sapien eget felis fermentum aliquam. Integer consequat erat quis
          libero euismod, a tincidunt nisi consectetur.
        </p>
        <p className="text-gray-700 mt-4">
          Praesent consequat metus in velit tristique, quis malesuada felis
          tempor. Curabitur vitae leo nec mi vehicula dictum sit amet nec
          ligula.
        </p>
      </section>
    </main>
  );
};

function Home() {
  return <h1>Home Page</h1>;
}
function About() {
  return <h1>About Page</h1>;
}
function Contact() {
  return <h1>Contact Page</h1>;
}

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <div className="flex flex-col min-h-screen bg-gray-140">
          <nav className="p-5">
            <Link className="px-5" to="/">
              Landing
            </Link>
            <Link className="px-5" to="/about">
              About
            </Link>
            <Link className="px-5" to="/contact">
              Contact
            </Link>
            <Link className="px-5" to="/profileSettings">
              Profile Settings
            </Link>
            <Link className="px-5" to="/login">
              Login
            </Link>
            <Link className="px-5" to="/addNewLocation">
              Add new Location
            </Link>
            <Link className="px-5" to="/editLocation">
              editLocation
            </Link>
          </nav>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profileSettings" element={<ProfileSettings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addNewLocation" element={<AddNewLocation />} />
            <Route path="/editLocation" element={<EditLocation />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
