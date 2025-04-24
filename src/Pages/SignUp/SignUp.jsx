import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from 'axios';
import "./styles.css";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.data.token) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <Button
        variant="contained"
        color="primary"
        sx={{
          position: "absolute",
          top: "5%",
          right: "2%",
          backgroundColor: "rgba(48, 48, 48, 0.1)",
          color: "blue",
          padding: "10px",
          borderRadius: "10px",
          fontSize: 12,
          boxShadow: "none",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ArrowBackIosIcon sx={{ fontSize: 12 }} />
        <Link to="/" className="Link">
          Back to Home
        </Link>
      </Button>
      <div className="left-panel">
        <img
          src="https://d1z1smzgvvydhp.cloudfront.net/MnCiW3vZW58mLWAiMNIj0zdtWtc=/1874x968/smart/filters:format(webp)/https://cdn1.kingschat.online/uploads/media/5393857a73312e31b57f3700/dVc2V2dOeVBYR2tkZkQ3YlNVUkY1dz09/GS_MAP_LOGO.png"
          alt="Gospel Spread Map Logo"
          className="left-panel-logo"
        />
        <div>
          <h1>Welcome Aboard!</h1>
          <p className="left-panel-text">
            Join us and start your journey.<br></br> We're excited to have you!
          </p>
        </div>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button className="login-btn" type="submit">
          Register
        </button>
        <div className="helper-links">
          <p>
            Already have an account?<Link to="/login"> Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
