import {
  login,
  register,
  updateUser,
} from "../../data/repositories/auth.repository";
import {
  LoginRequest,
  RegisterRequest,
  User,
  ApiResponse,
} from "../../data/models/User";

// Login use case
export const loginUserUseCase = async (payload: LoginRequest) => {
  const response = await login(payload);
  
  return response;
};

// Register use case
export const registerUserUseCase = async (payload: RegisterRequest) => {
  return await register(payload);
};

// ✅ Update user use case
export const updateUserUseCase = async (
  userId: string,
  payload: Partial<User>
): Promise<ApiResponse<User>> => {
  const response = await updateUser(userId, payload);

  return response;
};