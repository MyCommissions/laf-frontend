import { useMutation } from "@tanstack/react-query";
import { loginUserUseCase, registerUserUseCase } from "../usecases/authUseCases";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../../data/models/User";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginUserUseCase,
  });
};

export const useRegister = () => {
    return useMutation<RegisterResponse, Error, RegisterRequest>({
      mutationFn: registerUserUseCase,
    });
}