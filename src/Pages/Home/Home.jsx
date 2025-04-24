import React, { useState, useEffect } from "react";
import "./Home.css";
import { Button, Divider, Typography, useMediaQuery } from "@mui/material";
import { green, blue } from "@mui/material/colors";
import NavigationMenu from "../../components/NavigationMenu/NavigationMenu";
import logo from "../../assets/GSMAPLOGO.png";
import GlobeComponent from "../../components/GlobeComponent/GlobeComponent";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [visible, setVisible] = React.useState(true);
  const matches = useMediaQuery("(min-width:768px)");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setVisible(matches);
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [matches]);

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="Home">
      <nav className="home-navbar">
        <NavigationMenu visible={visible} setVisible={setVisible} />
        <img src={logo} alt="  GSMAP" className="logo" />
        {/* <div className="auth-buttons">
          {isLoggedIn ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogout}
              sx={{
                backgroundColor: "rgba(48, 48, 48, 0.1)",
                color: "green",
                padding: "10px",
                borderRadius: "10px",
                fontSize: 12,
                boxShadow: "none",
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
                sx={{
                  backgroundColor: "rgba(48, 48, 48, 0.1)",
                  color: "green",
                  padding: "10px",
                  borderRadius: "10px",
                  fontSize: 12,
                  boxShadow: "none",
                  marginRight: "10px",
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/signup"
                sx={{
                  backgroundColor: "rgba(48, 48, 48, 0.1)",
                  color: "green",
                  padding: "10px",
                  borderRadius: "10px",
                  fontSize: 12,
                  boxShadow: "none",
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </div> */}
      </nav>
      <GlobeComponent />
      <div className={visible ? "reach-percentage" : "reach-percentage hidden"}>
        <Typography
          sx={{
            fontSize: 52,
            fontStretch: "expanded",
            fontFamily: "Smooch sans",
            lineHeight: "1.1",
            fontWeight: 500,
          }}
        >
          60%
        </Typography>
        <Typography
          sx={{
            fontSize: 18,
            fontStretch: "expanded",
            fontFamily: "Smooch sans",
            lineHeight: "1",
            fontWeight: 500,
            textTransform: "capitalize",
          }}
        >
          spread rate of the gospel around the world
        </Typography>
      </div>
      <div className={visible ? "color-codes-info" : "color-codes-info hidden"}>
        <Typography
          className="color-codes"
          sx={{ padding: "5px", fontSize: 14 }}
        >
          Where the Gospel is yet to reach
        </Typography>
        <Divider />
        <Typography
          className="color-codes"
          sx={{ padding: "5px", fontSize: 14 }}
        >
          Where the Gospel has reached
        </Typography>
      </div>
      <Button
        sx={{
          flexDirection: "column",
          backgroundColor: blue[800],
          color: "black",
          position: "fixed",
          bottom: "5%",
          marginLeft: "10px",
          marginRight: "10px",
          padding: "10px",
          borderRadius: "10px",
          fontSize: 12,
          boxShadow: "none",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontWeight: 800, lineHeight: 1.1, fontSize: 16 }}>
          CLICK TO UPLOAD YOUR REPORT IF YOU HAVE EVANGELIZED
        </Typography>
        <Typography sx={{ fontWeight: 600, fontSize: 12 }}>
          STREET, TOWN, CITY, STATE, COUNTRY FOR THE GOSPEL
        </Typography>
      </Button>
    </div>
  );
};

export default Home;
