import { useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { throttle } from 'lodash';

const useAutoLogout = (user, timeoutDuration = 15 * 60 * 1000) => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/v1/logout', {}, { withCredentials: true });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      navigate('/login');
    }
  };

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(logout, timeoutDuration);
  }, [timeoutDuration]);

  // Throttle to limit how often resetTimer can be called
  const throttledResetTimer = useCallback(throttle(resetTimer, 1000), [resetTimer]);

  useEffect(() => {
    if (!user) return;

    const events = ['click', 'keydown', 'scroll'];
    events.forEach(e => window.addEventListener(e, throttledResetTimer));
    resetTimer(); // Initialize on load

    return () => {
      events.forEach(e => window.removeEventListener(e, throttledResetTimer));
      clearTimeout(timeoutRef.current);
      throttledResetTimer.cancel(); // Cancel any pending throttled calls
    };
  }, [user, throttledResetTimer, resetTimer]);
};

export default useAutoLogout;
