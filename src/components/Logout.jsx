import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove role and token from localStorage
    localStorage.removeItem('role');
    localStorage.removeItem('Utoken');
    localStorage.removeItem('Adtoken');
    localStorage.removeItem('Suptoken');
    localStorage.removeItem('Chatoken');

    // Redirect to login
    navigate('/login');

    // Reload the page to reflect changes
    window.location.reload();
  }, [navigate]);

  return null; // No UI needed
};

export default Logout;
