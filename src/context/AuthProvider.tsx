import { useSegments, useRouter } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../../firebase.config";

type ContextState = { user: User | null | undefined | "loading" };

const AuthContext = createContext<ContextState>({
  user: null,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [user, setUser] = useState<User | null | "loading">("loading");
  const segments = useSegments();
  const router = useRouter();
  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in
          setUser(user);
        } else {
          // User is signed out
          setUser(null);
        }
      },
    );

    return unsubscribeFromAuthStatusChanged;
  }, []);

  useEffect(() => {
    if (user === "loading") return;

    const isInUnauthorizedRoute = segments[0] === "(unauthorized)";

    if (!!user && isInUnauthorizedRoute) {
      // Redirect authenticated users away from unauthorized routes (like the login page)
      router.push("/home");
    } else if (!user && !isInUnauthorizedRoute) {
      // Redirect unauthenticated users to the login page if they're not already there
      router.replace("/");
    }
  }, [user, segments]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
