import axios from "axios";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../models/User";

const BASE_URL = process.env.REACT_APP_API_URL;

console.log(BASE_URL)

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${BASE_URL}/auth/login`,
      credentials
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login Failed.");
  }
};

export const registerUser = async (
  credentials: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${BASE_URL}/auth/register`,
      credentials
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login Failed.");
  }
};