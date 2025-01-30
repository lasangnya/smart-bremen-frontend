import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import LoginPage from "./backend/pages/LoginPage";
import Dashboard from "./backend/pages/Dashboard";
import SignupPage from "./backend/pages/SignupPage";
import AddNewLocation from "./backend/components/AddNewLocation";
import EditLocation from "./backend/components/EditLocation";
const routes = {
  home: "/",
  contactUs: "/contactus",
  aboutUs: "/aboutus",
  loginPage: "/login",
  dashboard: "/dashboard",
  signupPage: "/signup",
  addNewLocation: "/addNewLocation",
  editLocation: "/editLocation",
};

export default routes;

export const API_BASE_URL = "https://smart-bremen.com";
