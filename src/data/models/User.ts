// src/data/models/User.ts

// Base User model
export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  roleId: number;
  status: boolean;
  createdAt: string;
}

// Generic API wrapper
export interface ApiResponse<T = null> {
  status: string; // "success" | "fail"
  message: string; // server-provided message
  data?: T; // optional payload
}

// Auth-specific responses
export type AuthResponse = ApiResponse<{ user: User }>;
export type LoginResponse = AuthResponse;
export type RegisterResponse = ApiResponse; // no data returned, only status/message

// Requests
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

// Data used on signup form (client-side abstraction)
export type SignUpData = RegisterRequest;

export interface CreateAccountData extends SignUpData {
  roleId: number;
}

// Role constants
export const ROLES = {
  ADMIN: 1,
  STAFF: 2,
} as const;
