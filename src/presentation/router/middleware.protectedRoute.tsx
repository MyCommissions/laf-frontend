import React from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  children: React.ReactNode;
}

const fetchCurrentUser = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, { withCredentials: true });
  return res.data.data.user;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError || !user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
