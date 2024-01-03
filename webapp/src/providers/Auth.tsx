import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "~/payload/payload-types";

import { api } from "~/utils/api";

type Logout = () => Promise<void>;

type AuthContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: Logout;
};

const Context = createContext({} as AuthContext);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>();

  const logout = useCallback<Logout>(async () => {
    await api.user.logout();
    setUser(null);
    return;
  }, []);

  // On mount, get user and set
  useEffect(() => {
    const fetchMe = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/users/me`,
        {}
      );

      const user = await res.json();

      setUser(user);
    };

    fetchMe();
  }, [api]);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

type UseAuth<T = User> = () => AuthContext; // eslint-disable-line no-unused-vars

export const useAuth: UseAuth = () => useContext(Context);
