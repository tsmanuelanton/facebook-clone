"use client";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import * as LoginService from "@/services/login";
import * as LogoutService from "@/services/logout";
import { User } from "@/types/user";
import { getUser } from "@/services/users";

type SessionContextType = {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  loggedUser: User | null;
};

export const SessionContext = createContext<SessionContextType>(
  {} as SessionContextType
);

export const SessionContextProvider = ({ children }: PropsWithChildren) => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const userID = await LoginService.login({ email, password });
    if (userID) {
      const user = await getUser(userID)!;
      localStorage.setItem("loggedUser", JSON.stringify(user));
      setLoggedUser(user);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await LogoutService.logout();
    localStorage.removeItem("loggedUser");
    setLoggedUser(null);
    return true;
  };

  useEffect(() => {
    const data = localStorage.getItem("loggedUser");
    data && setLoggedUser(JSON.parse(data));
  }, []);

  return (
    <SessionContext.Provider value={{ login, logout, loggedUser }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
