import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

interface Props {
  children: React.ReactNode;
}

const GuestOnlyRoute: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default GuestOnlyRoute;
