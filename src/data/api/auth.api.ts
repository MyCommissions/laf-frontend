// data/api/auth.api.ts
import client from "./client";
import { LoginRequest, RegisterRequest, User } from "../models/User";

export const loginApi = async (payload: LoginRequest): Promise<User> => {
  const { data } = await client.post("/auth/login", payload);
  return data;
};

export const registerApi = async (payload: RegisterRequest): Promise<User> => {
  const { data } = await client.post("/auth/register", payload);
  return data;
};

export const logoutApi = async (): Promise<void> => {
  await client.post("/auth/logout");
};

export const meApi = async (): Promise<User> => {
  const { data } = await client.get("/auth/me");
  return data;
};
