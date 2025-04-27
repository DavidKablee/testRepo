import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';
import "./styles.css";
import { API_ENDPOINTS } from '../../../backend/config/api';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log('Attempting login with email:', email);
      const response = await axios.post(API_ENDPOINTS.LOGIN, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 5000 // 5 second timeout
      });
      
      console.log('Login response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/');
      } else {
        setError('Login failed: No token received');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.code === 'ECONNABORTED') {
        setError('Connection timed out. Please check if the server is running.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to server. Please check if the server is running.');
      } else if (err.response) {
        setError(err.response.data.message || 'Invalid email or password');
      } else if (err.request) {
        setError('No response from server. Please check if the server is running.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Button variant="contained" color="primary" 
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
        <Link to="/" className="Link">Back to Home</Link>
      </Button>
      {/* Left Panel */}
      <div className="left-panel">
        <img
          src="https://d1z1smzgvvydhp.cloudfront.net/MnCiW3vZW58mLWAiMNIj0zdtWtc=/1874x968/smart/filters:format(webp)/https://cdn1.kingschat.online/uploads/media/5393857a73312e31b57f3700/dVc2V2dOeVBYR2tkZkQ3YlNVUkY1dz09/GS_MAP_LOGO.png"
          alt="Gospel Spread Map Logo"
          className="left-panel-logo"
        />
        <h1>Welcome Back!</h1>
        <p className="left-panel-text">
          Access your account to continue your journey.
          <br />
          We're glad to have you here!
        </p>
      </div>

      {/* Right Panel */}
      <div className="login-form">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px', padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px' }}>{error}</div>}

          {/* Login Button */}
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Helper Links */}
        <div className="helper-links">
          <p>
            Forgot your password? <Link to= "/reset" > Reset it here</Link>
          </p>
          <p>
          Don't have an account?,<Link to="/signup"> Sign up now!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
