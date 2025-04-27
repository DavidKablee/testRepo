import React, { useState, useEffect } from "react";
import "./Reports.css";
import { useTheme } from '@mui/material/styles';
import FormDialog from "../../components/FormDialog/FormDialog";
// import VariantDrawer from '../../components/variantDrawer/VariantDrawer';
import { Avatar, Button, Typography, CircularProgress, IconButton } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import { green } from "@mui/material/colors";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from "react-router-dom";
import UploadIcon from "@mui/icons-material/Upload";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import ReportsTable from "../../components/ReportsTable/ReportsTable";
import { useTheme as useCustomTheme } from '../../context/ThemeContext';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../backend/config/api';

const Reports = () => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState({
    totalSoulsSubmitted: 0,
    totalSoulsWon: 0,
    locationsReached: 0
  });
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reportAdded, setReportAdded] = useState(0);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view reports');
        setLoading(false);
        navigate('/login');
        return;
      }

      // Fetch user data
      const userResponse = await axios.get(API_ENDPOINTS.USER_DATA, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(userResponse.data);

      // Fetch statistics
      const statsResponse = await axios.get(API_ENDPOINTS.REPORTS_STATS, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStats(statsResponse.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Error fetching data');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reportAdded]); // Refresh when a new report is added

  const handleReportAdded = () => {
    setReportAdded(prev => prev + 1); // Trigger refresh
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  // const [drawerOpen, setDrawerOpen] = React.useState(false);
  // const handleDrawerOpen = () => {
  //   setDrawerOpen(true);
  // };

  return (
    <div className={`report-body ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="theme-toggle">
        <IconButton onClick={toggleTheme} color="inherit">
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </div>
      {/* <VariantDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} setFormDialogOpen={setOpen} /> */}
      <FormDialog open={open} setOpen={setOpen} onReportAdded={handleReportAdded} />
      <FloatingButton />
      <Button variant="contained" color="primary" 
        sx={{
          margin: "20px",
          marginLeft: "20px",
          marginRight: "20px",
          marginBottom: "0px",
          backgroundColor: isDarkMode ? "rgba(48, 48, 48, 0.1)" : "#3498db",
          color: isDarkMode ? "blue" : "white",
          padding: "10px 20px",
          borderRadius: "10px",
          fontSize: 14,
          boxShadow: isDarkMode ? "none" : "0 4px 12px rgba(52, 152, 219, 0.3)",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          '&:hover': {
            backgroundColor: isDarkMode ? "rgba(48, 48, 48, 0.2)" : "#2980b9",
            transform: "translateY(-1px)",
            boxShadow: isDarkMode ? "none" : "0 6px 16px rgba(52, 152, 219, 0.4)"
          }
        }}
      >
        <ArrowBackIosIcon sx={{ fontSize: 14, marginRight: 1 }} />
        <Link to={"/"} className="Link" style={{ 
          color: isDarkMode ? "blue" : "white",
          textDecoration: "none",
          fontWeight: 500
        }}>Back to Home</Link>
      </Button>
      <div className="report-header">
        <div className="report-header-wrapper">
          <div className="report-header-title">
            <Avatar
              sx={{ bgcolor: green[400] }}
              sizes="medium"
              className="grid-rowspan-2"
            >
              {user?.name?.charAt(0) || 'U'}
            </Avatar>
            <p className="grid-col-2">{user?.name || 'User'}</p>
            <span className="location-info grid-col-2 grid-row-2">
              <Typography className="" sx={{ color: isDarkMode ? "grey" : "rgba(0, 0, 0, 0.7)", fontSize: 14 }}>
                {user?.location || 'Location not set'}{" "}
              </Typography>
              <PlaceIcon
                className="grid-col-2"
                sx={{
                  color: isDarkMode ? "grey" : "rgba(0, 0, 0, 0.7)",
                  fontSize: 14,
                  cursor: "pointer",
                  marginLeft: 0.3,
                }}
              />
            </span>
          </div>
          <div className="report-header-description">
            <span className="description-group">
              <p className="description-title">Souls submitted</p>
              <p className="description-sub-title">{stats.totalSoulsSubmitted}</p>
            </span>
            <span className="description-group">
              <p className="description-title">Souls Won</p>
              <p className="description-sub-title">{stats.totalSoulsWon}</p>
            </span>
            <span className="description-group">
              <p className="description-title">Locations Reached</p>
              <p className="description-sub-title">{stats.locationsReached}</p>
            </span>
          </div>
        </div>
        <Button
          onClick={() => setOpen(true)}
          sx={{
            height: "min-content",
            marginLeft: "auto",
            [theme.breakpoints.down('768px')]: {
              marginLeft: "none",
            },
          }}
          variant="contained"
        >
          <UploadIcon sx={{ fontSize: 18 }} />
          <Typography sx={{ fontSize: 14 }}>Upload Report</Typography>
        </Button>
      </div>
      <div className="reports-table-container">
        <ReportsTable onReportAdded={reportAdded} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Reports;
