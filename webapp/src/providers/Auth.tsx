import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useState, createContext, useContext, useEffect } from "react";
import { UserIncluded } from "~/server/api/routers/user";

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

type AuthContext = {
  user: UserIncluded | null;
  setUser: (user: UserIncluded | null) => void;
  showing: boolean;
  setShowing: (showing: boolean) => void;
  deferredEvent: BeforeInstallPromptEvent | null;
  setDeferredEvent: (event: BeforeInstallPromptEvent | null) => void;
};

const Context = createContext({} as AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserIncluded | null>(null);

  const [showing, setShowing] = useState(false);
  const [deferredEvent, setDeferredEvent] =
    useState<BeforeInstallPromptEvent | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchMe = async () => {
      const token = getCookie(process.env.NEXT_PUBLIC_JWT_NAME ?? "cje-jwt");
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
        deleteCookie(process.env.NEXT_PUBLIC_JWT_NAME ?? "cje-jwt");
        router.push("/");
      }
    };

    fetchMe();
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        showing,
        setShowing,
        deferredEvent,
        setDeferredEvent,
      }}
    >
      {children}
    </Context.Provider>
  );
};

type UseAuth = () => AuthContext;

export const useAuth: UseAuth = () => useContext(Context);
