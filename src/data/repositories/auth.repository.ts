import { loginUser, registerUser } from "../api/auth.api";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../models/User";

export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  return await loginUser(credentials);
};

export const register = async (
  credentials: RegisterRequest
): Promise<RegisterResponse> => {
  return await registerUser(credentials);
};