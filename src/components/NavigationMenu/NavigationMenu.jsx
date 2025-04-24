import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Drawer, List, ListItem, ListItemText, Switch, FormControlLabel } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./NavigationMenu.css";

const NavigationMenu = ({ visible, setVisible }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
    setIsOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const menuItems = [
    ...(isLoggedIn ? [
      { text: 'Dashboard', path: '/dashboard' }
    ] : [
      { text: 'Login', path: '/login' },
      { text: 'Sign Up', path: '/signup' }
    ])
  ];

  return (
    <div className="navigation-menu">
      <Button
        onClick={toggleDrawer(true)}
        sx={{
          color: "green",
          padding: "10px",
          borderRadius: "10px",
          fontSize: 12,
          boxShadow: "none",
        }}
      >
        <MenuIcon />
      </Button>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          className="drawer-content"
        >
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  color: "green",
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            {isLoggedIn && (
              <ListItem
                button
                onClick={handleLogout}
                sx={{
                  color: "green",
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <ListItemText primary="Logout" />
              </ListItem>
            )}
            <ListItem>
              <FormControlLabel
                control={
                  <Switch
                    checked={visible}
                    onChange={(e) => setVisible(e.target.checked)}
                    color="primary"
                  />
                }
                label="Show Info"
              />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default NavigationMenu;
