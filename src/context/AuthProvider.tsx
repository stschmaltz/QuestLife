import { useSegments, useRouter } from "expo-router";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type ContextState = { user: User | null | undefined };

const AuthContext = createContext<ContextState>({
  user: null,
});

export const useAuth = () => useContext(AuthContext);

function useProtectedRoute(user: any) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const isUnauthorized = segments[0] === "unauthorized";
    console.log("isUnauthorized", isUnauthorized);
    console.log("segments", segments);
    if (!user && !isUnauthorized) {
      // Redirect to the sign-in page.
      router.replace("/");
    } else if (user && isUnauthorized) {
      // Redirect away from the sign-in page.
      router.replace("/home");
    }
  }, [user, segments]);
}

export function AuthProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [user, setUser] = useState<User | null>();
  const auth = getAuth();

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
      }
    );

    return unsubscribeFromAuthStatusChanged;
  }, []);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
