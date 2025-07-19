import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../slicers/auth/authSlice";

const useAuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/me`, {
          withCredentials: true,
        });
        if (res.data?.user) {
          dispatch(login(res.data.user));  // Update Redux with user info
        }
      } catch (err) {
        console.log("Not authenticated or session expired");
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useAuthInitializer;
