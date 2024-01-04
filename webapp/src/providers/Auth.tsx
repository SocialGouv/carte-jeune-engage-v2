import { getCookie } from "cookies-next";
import React, { useState, createContext, useContext, useEffect } from "react";
import { User } from "~/payload/payload-types";

type AuthContext = {
  user?: User | null;
  setUser: (user: User | null) => void;
};

const Context = createContext({} as AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const fetchMe = async () => {
      const token = getCookie("cje-jwt");
      const result = await fetch("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((req) => req.json());
      setUser(result.user || null);
    };

    fetchMe();
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

type UseAuth = () => AuthContext;

export const useAuth: UseAuth = () => useContext(Context);
