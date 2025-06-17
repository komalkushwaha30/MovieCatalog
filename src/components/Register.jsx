import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { useColor } from "../context/colorContext";
import "../App.css";

// Function to call backend register API
const registerUser = async (email, password) => {
  const credentials = { email, password };
  const response = await axios.post(`http://localhost:5000/register`, credentials);
  return response.data;
};

function Register() {
  const { darkMode, setDarkMode } = useColor();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (email, password) => {
    try {
      const data = await registerUser(email, password);
      console.log("Registration successful", data);

      // After successful registration, navigate to login page
      alert("Registration successful! Please login.");
      navigate("/");

    } catch (error) {
      console.log("Registration failed");
      alert("Registration failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className={darkMode ? "darkMode" : "lightMode"}>
  <div className="center-page">
    <div className="login-container"> {/* fixed the typo here */}
      <div className="login-modebtn">
        <button onClick={() => setDarkMode(!darkMode)}>
          {!darkMode ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
      <h1>Register</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
        />
      </div>
      <button
        onClick={() => handleRegister(email, password)}
        className="login-btn"
      >
        Register
      </button>
      <p>
        Already have an account? <Link to={"/"}>Login</Link>
      </p>
    </div>
  </div>
</div>

  );
}

export default Register;
