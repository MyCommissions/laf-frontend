import { useMutation } from "@tanstack/react-query";
import { login, register } from "../../data/repositories/auth.repository";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../../data/models/User";

// Hook for login
export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (credentials) => login(credentials),
  });
};

// Hook for register
export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: (userData) => register(userData),
  });
};
