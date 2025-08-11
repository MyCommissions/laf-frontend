import { login, register } from "../../data/repositories/auth.repository";
import { LoginRequest, RegisterRequest } from "../../data/models/User";
import { setToken } from "../services/tokenService";

export const loginUserUseCase = async (payload: LoginRequest) => {
    const response = await login(payload);
    if (response.status === "success") {
        setToken(response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response;
}

export const registerUserUseCase = async (payload: RegisterRequest) => {
    return await register(payload);
}