import React, { useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
  
    useEffect(() => {
      // Clear authentication data from local storage or cookies
      localStorage.removeItem('token'); // or any other storage mechanism you use
      window.dispatchEvent(new Event('userLogout'))
      
      // Redirect to the home page or login page
      navigate('/');
    }, [navigate]);
  
    return <div>Logging out...</div>; // Optionally show a message or spinner
  }
  
  export default Logout;
