import { useEffect, useRef, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { throttle } from 'lodash';

const useAutoLogout = (user, timeoutDuration = 15 * 60 * 1000) => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const logout = useCallback(async () => {
    try {
      await axios.post(process.env.REACT_APP_BACKEND_URL + `/logout`, {}, { withCredentials: 'include' });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      navigate('/login');
    }
  }, [navigate]);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(logout, timeoutDuration);
  }, [timeoutDuration, logout]);

  // ✅ FIXED: Use useMemo instead of useCallback
  const throttledResetTimer = useMemo(() => throttle(resetTimer, 1000), [resetTimer]);

  useEffect(() => {
    if (!user) return;

    const events = ['click', 'keydown', 'scroll'];
    events.forEach(e => window.addEventListener(e, throttledResetTimer));
    resetTimer();

    return () => {
      events.forEach(e => window.removeEventListener(e, throttledResetTimer));
      clearTimeout(timeoutRef.current);
      throttledResetTimer.cancel();
    };
  }, [user, throttledResetTimer, resetTimer]);
};

export default useAutoLogout;
