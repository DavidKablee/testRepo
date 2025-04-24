import './App.css';
import SignUp from "./Pages/SignUp/SignUp.jsx"; // Import the Signup component
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import React Router
import Home from './Pages/Home/Home.jsx';
import Login from './Pages/Login/Login.jsx';
import Reports from './Pages/Reports/Reports.jsx';
import PasswordReset from './Pages/PasswordReset/PasswordReset.jsx';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [open, setOpen] = React.useState(false);

  return (
    <ThemeProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset" element={<PasswordReset />} />
            <Route path="/dashboard" element={<Reports open={open} setOpen={setOpen}/>} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
