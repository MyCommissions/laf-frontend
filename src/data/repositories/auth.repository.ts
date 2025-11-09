import api from "../api/client"; // axios instance with baseURL & withCredentials
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
  ApiResponse,
} from "../models/User";
import { updateUserApi } from "../api/auth.api";

// login request
export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/login", credentials);
  return data;
};

// register request
export const register = async (
  userData: RegisterRequest
): Promise<RegisterResponse> => {
  const { data } = await api.post<RegisterResponse>("/auth/register", userData);
  return data;
};

// update user
export const updateUser = async (
  userId: string,
  payload: Partial<User>
): Promise<ApiResponse<User>> => {
  return await updateUserApi(userId, payload);
};
