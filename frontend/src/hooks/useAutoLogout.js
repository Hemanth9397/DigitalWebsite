import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAutoLogout = () => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const logout = async () => {
    await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
    navigate('/login');
  };

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(logout, 15 * 60 * 1000); // 15 minutes
  };

  useEffect(() => {
    const events = ['click', 'keydown', 'scroll'];
    events.forEach(e => window.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimer));
      clearTimeout(timeoutRef.current);
    };
  }, []);
};

export default useAutoLogout;
