import { Route, Routes } from "react-router-dom";
import "./App.css";
import CourseDetail from "./components/CourseDetail/CourseDetail";
import Header from "./components/header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/dashbord/Dashboard";
import NewCourse from "./pages/NewCourse/NewCourse";
import Contact from "./pages/contact/Contact";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/find/:slug" element={<CourseDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newcourse" element={<NewCourse />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
