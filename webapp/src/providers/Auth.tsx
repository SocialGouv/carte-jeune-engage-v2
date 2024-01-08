import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useState, createContext, useContext, useEffect } from "react";
import { User } from "~/payload/payload-types";

type AuthContext = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const Context = createContext({} as AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMe = async () => {
      const token = getCookie("cje-jwt");
      if (!token) return;
      const result = await fetch("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((req) => req.json());
      if (result && result.user !== null) {
        setUser(result.user);
      } else {
        setUser(null);
        deleteCookie("cje-jwt");
        router.push("/login");
      }
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
