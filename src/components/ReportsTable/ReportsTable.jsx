import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';

const ReportsTable = ({ onReportAdded, isDarkMode }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view reports');
        setLoading(false);
        return;
      }

      const response = await axios.get(API_ENDPOINTS.REPORTS, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setReports(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching reports:', err);
      if (err.response) {
        setError(err.response.data.message || 'Error fetching reports');
      } else if (err.request) {
        setError('No response from server. Please check if the server is running.');
      } else {
        setError('Error setting up request');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [onReportAdded]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Typography>No reports found. Start by adding your first report!</Typography>
      </div>
    );
  }

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        border: '1px solid',
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
        color: isDarkMode ? 'white' : '#333',
        width: '100%',
        overflowX: 'auto'
      }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ 
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            '& th': {
              color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
              fontWeight: 600,
              borderBottom: '1px solid',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              whiteSpace: 'nowrap',
              padding: '12px 16px',
              '@media (max-width: 600px)': {
                padding: '8px 12px',
                fontSize: '0.875rem'
              }
            }
          }}>
            <TableCell>Date</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report) => {
            const details = report.description.split('\n').reduce((acc, line) => {
              const [key, value] = line.split(': ');
              if (key && value) {
                acc[key.toLowerCase()] = value;
              }
              return acc;
            }, {});

            return (
              <TableRow 
                key={report._id} 
                hover
                sx={{
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                  },
                  '& td': {
                    color: isDarkMode ? 'white' : '#333',
                    borderBottom: '1px solid',
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    padding: '12px 16px',
                    '@media (max-width: 600px)': {
                      padding: '8px 12px',
                      fontSize: '0.875rem'
                    }
                  }
                }}
              >
                <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                <TableCell>{details.title || '-'}</TableCell>
                <TableCell>{details.name || '-'}</TableCell>
                <TableCell>
                  <Tooltip title={details.email || '-'}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        maxWidth: '120px', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap',
                        color: isDarkMode ? 'white' : '#333',
                        '@media (max-width: 600px)': {
                          maxWidth: '80px'
                        }
                      }}
                    >
                      {details.email || '-'}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>{details.phone || '-'}</TableCell>
                <TableCell>
                  <Tooltip title={report.location || '-'}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        maxWidth: '120px', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap',
                        color: isDarkMode ? 'white' : '#333',
                        '@media (max-width: 600px)': {
                          maxWidth: '80px'
                        }
                      }}
                    >
                      {report.location || '-'}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={details.address || '-'}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        maxWidth: '120px', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap',
                        color: isDarkMode ? 'white' : '#333',
                        '@media (max-width: 600px)': {
                          maxWidth: '80px'
                        }
                      }}
                    >
                      {details.address || '-'}
                    </Typography>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportsTable;
