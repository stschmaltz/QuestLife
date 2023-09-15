import { useSegments, useRouter } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../../firebase.config";

type ContextState = { user: User | null | undefined };

const AuthContext = createContext<ContextState>({
  user: null,
});

export const useAuth = () => useContext(AuthContext);

export function useUnauthorizedRoute(user: any) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const isInUnauthorizedRoute = segments[0] === "(unauthorized)";
    console.log("useUnauthorizedRoute", {
      user,
      segments,
      bool: user && isInUnauthorizedRoute,
    });

    if (user && isInUnauthorizedRoute) {
      // Redirect to the sign-in page.
      router.replace("/home");
    }
  }, [user, segments]);
}

export function useProtectedRoute(user: any) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log("useProtectedRoute", { user, segments });
    const isInUnauthorizedRoute = segments[0] === "(unauthorized)";
    if (!user && !isInUnauthorizedRoute) {
      // Redirect to the sign-in page.
      router.replace("/");
    }
  }, [user, segments]);
}

export function AuthProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [user, setUser] = useState<User | null>();

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
