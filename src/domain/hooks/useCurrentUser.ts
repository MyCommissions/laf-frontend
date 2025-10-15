// src/hooks/useAuthUser.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchCurrentUser = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, {
    withCredentials: true,
  });
  return res.data.data.user;
};

export const useAuthUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
    refetchOnWindowFocus: false, // don’t spam on tab switch
  });
};
