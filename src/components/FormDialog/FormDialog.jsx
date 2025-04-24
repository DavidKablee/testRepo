import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
  useMediaQuery
} from "@mui/material";
import axios from 'axios';
import "./FormDialog.css";
import CustomTooltip from '../CustomTooltip/CustimToolTip';
import CloseIcon from '@mui/icons-material/Close';
import { API_ENDPOINTS } from '../../config/api';

export default function FormDialog({ open, setOpen }) {
  const [screen, setScreen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    address: "",
    hasSoulsSubmitted: false,
    hasSoulsWon: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to submit a report');
        return;
      }

      console.log('Submitting form data:', formData);

      const response = await axios.post(API_ENDPOINTS.REPORTS, {
        ...formData,
        location: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.country}`,
        description: `Title: ${formData.title}\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nAddress: ${formData.address}`,
        soulsSubmitted: formData.hasSoulsSubmitted ? 1 : 0,
        soulsWon: formData.hasSoulsWon ? 1 : 0
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Report submitted successfully:', response.data);
      setOpen(false);
      // Reset form
      setFormData({
        title: "",
        name: "",
        email: "",
        phone: "",
        country: "",
        state: "",
        city: "",
        address: "",
        hasSoulsSubmitted: false,
        hasSoulsWon: false
      });
    } catch (err) {
      console.error('Error submitting report:', err);
      if (err.response) {
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
        setError(err.response.data.message || `Server error: ${err.response.status}`);
      } else if (err.request) {
        console.error('No response received:', err.request);
        setError('No response from server. Please check if the server is running.');
      } else {
        console.error('Error setting up request:', err.message);
        setError('Error setting up request: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const matches = useMediaQuery("(min-width:768px)");
  useEffect(() => {
    setScreen(matches);
  }, [matches]);

  const text = 'Instructions for uploading the report';
  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      aria-labelledby="form-dialog-title" 
      className='Form-Dialog' 
      fullScreen={!screen}
      PaperProps={{
        style: {
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }
      }}
    >
      <DialogContent className='Form-Dialog-Content-Wrapper'>
        <DialogTitle id="Form-Dialog-Title">
          <div className="dialog-header">
            <div>
              <h2>Upload Report</h2>
              <p>Enter Your Soul's Contact Information</p>
            </div>
            <CloseIcon 
              sx={{
                fontSize: 24,
                cursor: 'pointer',
                color: 'white',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }} 
              onClick={handleClose} 
            />
          </div>
        </DialogTitle>
        <DialogContent className='Form-Dialog-Forms' id='Form-Dialog-Forms'>
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-grid">
              <div className='Form-Dialog-Content-Group'>
                <label>Title</label>
                <input 
                  type='text' 
                  className='Form-Dialog-Content-Input'
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter title"
                />
              </div>
              <div className='Form-Dialog-Content-Group'>
                <label>Name</label>
                <input 
                  type='text' 
                  className='Form-Dialog-Content-Input'
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter name"
                />
              </div>
              <div className='Form-Dialog-Content-Group grid-colspan-2'>
                <label>Email (optional)</label>
                <input 
                  type='email' 
                  className='Form-Dialog-Content-Input'
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </div>
              <div className='Form-Dialog-Content-Group'>
                <label>Phone Number</label>
                <input 
                  type='tel' 
                  className='Form-Dialog-Content-Input'
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter phone number"
                />
              </div>
              <div className='Form-Dialog-Content-Group'>
                <label>Country</label>
                <input 
                  type='text' 
                  className='Form-Dialog-Content-Input'
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  placeholder="Enter country"
                />
              </div>
              <div className='Form-Dialog-Content-Group'>
                <label>State</label>
                <input 
                  type='text' 
                  className='Form-Dialog-Content-Input'
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  placeholder="Enter state"
                />
              </div>
              <div className='Form-Dialog-Content-Group'>
                <label>City</label>
                <input 
                  type='text' 
                  className='Form-Dialog-Content-Input'
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="Enter city"
                />
              </div>
              <div className='Form-Dialog-Content-Group grid-colspan-2'>
                <label>Address</label>
                <input 
                  type='text' 
                  className='Form-Dialog-Content-Input'
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter address"
                />
              </div>
              <div className='Form-Dialog-Content-Group grid-colspan-2'>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="hasSoulsSubmitted"
                      checked={formData.hasSoulsSubmitted}
                      onChange={(e) => setFormData({ ...formData, hasSoulsSubmitted: e.target.checked })}
                    />
                    <span>I have souls submitted to report</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="hasSoulsWon"
                      checked={formData.hasSoulsWon}
                      onChange={(e) => setFormData({ ...formData, hasSoulsWon: e.target.checked })}
                    />
                    <span>Soul has been won</span>
                  </label>
                </div>
              </div>
            </div>
            <div className='Form-Dialog-Content-Button'>
              <button type="submit" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Report'}
              </button>
            </div>
          </form>
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
}