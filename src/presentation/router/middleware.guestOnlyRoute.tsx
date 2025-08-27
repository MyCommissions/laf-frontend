import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const GuestOnlyRoute = ({ children }: Props) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default GuestOnlyRoute;
