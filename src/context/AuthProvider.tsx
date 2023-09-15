import { useSegments, useRouter } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../../firebase.config";

type ContextState = { user: User | null | undefined | "loading" };

const AuthContext = createContext<ContextState>({
  user: null,
});

export const useAuth = () => useContext(AuthContext);

export function useAuthenticationRouting(user: any) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (user === "loading") return;
    console.log("useAuthenticationRouting", { user, segments });

    const isInUnauthorizedRoute = segments[0] === "(unauthorized)";

    console.log({
      isInUnauthorizedRoute,
      user,
      bool: !!user && isInUnauthorizedRoute,
    });
    if (!!user && isInUnauthorizedRoute) {
      // Redirect authenticated users away from unauthorized routes (like the login page)
      router.push("/home");
    } else if (!user && !isInUnauthorizedRoute) {
      console.log("else if");
      // Redirect unauthenticated users to the login page if they're not already there
      router.push("/");
    }
  }, [user, segments]);
}

export function AuthProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [user, setUser] = useState<User | null | "loading">("loading");

  useEffect(() => {
    console.log("AuthProvider", { onAuthStateChanged: true, user });
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
      auth,
      (user) => {
        console.log("lets go", { user });
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

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
