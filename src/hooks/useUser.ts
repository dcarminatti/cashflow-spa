import { useContext } from "react";
import { AuthContext } from "@/context/auth-provider";
import { AuthUser } from "@/lib/types/auth";
import useCookie from "./useCookie";

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setCookie, removeCookie } = useCookie();

  const addUser = (user: AuthUser) => {
    setUser(user);
    setCookie("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    removeCookie("user");
  };

  return { user, addUser, removeUser };
};
