import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/logout`,
        {},
        { withCredentials: true } // ensures cookies (JWT) are sent
      );

      // redirect after logout
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return logout;
};
