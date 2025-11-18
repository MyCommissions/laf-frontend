import { useMutation, useQuery } from "@tanstack/react-query";
import {
  login,
  register,
  updateUser,
} from "../../data/repositories/auth.repository";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
  ApiResponse,
} from "../../data/models/User";
import { getUsersByRoleUseCase, updateUserUseCase } from "../usecases/authUseCases";

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

// ✅ Hook for update user
export const useUpdateUser = () => {
  return useMutation<
    ApiResponse<User>,
    Error,
    { userId: string; payload: Partial<User> }
  >({
    mutationFn: ({ userId, payload }) => updateUserUseCase(userId, payload),
  });
};

// ✅ Hook to get a single user by role
export const useUserByRole = (roleId: number) => {
  return useQuery<User | null, Error>({
    queryKey: ["user", roleId],
    queryFn: async () => {
      const users = await getUsersByRoleUseCase(roleId);
      return users.length > 0 ? users[0] : null;
    },
    enabled: !!roleId,
  });
};