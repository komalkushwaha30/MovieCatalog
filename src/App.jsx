// kindly check out thoughtProcess.md
import "./App.css";
import { Routes, Route, useLocation } from "react-router";
import Login from "./components/Login";
import Register from "./components/Register";
import Display from "./components/Display";
import ProtectedRoute from "./components/ProtectedRoute";
import Details from "./components/Details";
import Like from "./components/Like";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<ProtectedRoute><Display /></ProtectedRoute>} />
        <Route path="/:title" element={<ProtectedRoute><Details /></ProtectedRoute>} />
        <Route path="like" element={<ProtectedRoute><Like /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
