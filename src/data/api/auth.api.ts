import client from "./client";
import {
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from "../models/User";

// LOGIN
export const loginApi = async (payload: LoginRequest): Promise<User> => {
  const { data } = await client.post("/auth/login", payload);
  return data;
};

// REGISTER
export const registerApi = async (payload: RegisterRequest): Promise<User> => {
  const { data } = await client.post("/auth/register", payload);
  return data;
};

// LOGOUT
export const logoutApi = async (): Promise<void> => {
  await client.post("/auth/logout");
};

// GET CURRENT USER
export const meApi = async (): Promise<User> => {
  const { data } = await client.get("/auth/me");
  return data;
};

// UPDATE USER
export const updateUserApi = async (
  userId: string,
  payload: Partial<User>
): Promise<ApiResponse<User>> => {
  const { data } = await client.put(`/auth/update/${userId}`, payload);
  return data;
};

// GET USERS BY ROLE (Admin only)
export const getUsersByRoleApi = async (roleId: number): Promise<User[]> => {
  const { data } = await client.get(`/auth/users?roleId=${roleId}`);
  return data.data; // ✅ unwrap the nested `data`
};