import { useUser } from "@/hooks/useUser";
import { config } from "@/lib/config";
import axios from "axios";
import { AuthResponse, TLogin, TRegister } from "@/lib/types/auth";
import useCookie from "./useCookie";

const API_URL = config.BACKEND_URL;

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();

  const { getCookie } = useCookie();

  const refresh = () => {
    let existingUser = null;
    const getFromCookie = async () => (existingUser = getCookie("user"));
    getFromCookie();

    if (existingUser) {
      try {
        addUser(JSON.parse(existingUser));
      } catch (e) {
        console.log(e);
      }
    }
  };

  const register = async (creds: TRegister) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, creds);
      if (response.status === 200) {
        return {
          data: response.data,
          success: true,
          message: "Registration successful!",
        } as AuthResponse;
      }
    } catch (error) {
      return {
        data: undefined,
        success: false,
        message: "Registration failed!",
      } as AuthResponse;
    }
  };

  const login = async (creds: TLogin) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, creds);
      if (response.status === 200) {
        const userResponse = {
          data: response.data,
          success: true,
          message: "Login successfully!",
        } as AuthResponse;

        if (userResponse.data) addUser(userResponse.data);
        return userResponse;
      }
    } catch (error) {
      return {
        data: undefined,
        success: false,
        message: "Login failed!",
      } as AuthResponse;
    }
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, register, logout, refresh };
};
