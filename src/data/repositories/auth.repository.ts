import api from "../api/client"; // <-- your axios instance with baseURL & withCredentials
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../models/User";

// login request
export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/login", credentials, {
    withCredentials: true, // ensures HTTP-only cookie is sent
  });
  return data;
};

// register request
export const register = async (
  userData: RegisterRequest
): Promise<RegisterResponse> => {
  const { data } = await api.post<RegisterResponse>(
    "/auth/register",
    userData,
    {
      withCredentials: true,
    }
  );
  return data;
};
