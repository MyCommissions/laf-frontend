import { login, register } from "../../data/repositories/auth.repository";
import { LoginRequest, RegisterRequest } from "../../data/models/User";

export const loginUserUseCase = async (payload: LoginRequest) => {
  // Call repository → backend will set HttpOnly cookie automatically
  const response = await login(payload);

  if (response.status === "success" && response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }


  return response;
};

export const registerUserUseCase = async (payload: RegisterRequest) => {
  return await register(payload);
};
