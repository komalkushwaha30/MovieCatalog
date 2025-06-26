import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { useColor } from "../context/colorContext";
import "../App.css";

// Login function that calls the backend
const loginUser = async (email, password) => {
  const credentials = { email, password };
  const response = await axios.post(`http://localhost:5000/login`, credentials);
  return response.data;
};



function Login() {

 

  const { darkMode, setDarkMode, login} = useColor();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
  document.body.className = darkMode ? "darkMode" : "lightMode";
}, [darkMode]);


  const handleLogin = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      console.log("Login successful", data);

      // Mark user as authenticated
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", email);
      login(email)

      

      navigate("/dashboard");
    } catch (error) {
      console.log("Login failed");
      alert("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className={darkMode ? "darkMode" : "lightMode"}>
  <div className="center-page">
    <div className="login-container">  {/* <-- fixed typo here */}
      <div className="login-modebtn">
        <button onClick={() => setDarkMode(!darkMode)}>
          {!darkMode ? "Dark Mode" : "Light Mode"}
        </button>
      </div>

      <h1>Login Form</h1>

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
          autoComplete="current-password"
          required
        />
      </div>

      <button
        onClick={() => handleLogin(email, password)}
        className="login-btn"
      >
        Submit
      </button>

      <p>
        Haven't registered? <Link to={"/register"}>Register</Link>
      </p>
    </div>
  </div>
</div>

  );
}

export default Login;
