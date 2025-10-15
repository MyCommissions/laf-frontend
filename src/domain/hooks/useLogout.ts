import { useNavigate } from "react-router-dom";
import { useAuth } from "../../presentation/providers/AuthProvider";

export const useLogout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return handleLogout;
};
