export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  roleId: number;
  status: boolean;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      role: number; // or `string` if you map roleId to a string like "admin"
    };
  };
}

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  status: string;
  message: string;
}