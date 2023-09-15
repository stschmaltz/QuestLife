import { Stack } from "expo-router";

import { useAuth, useUnauthorizedRoute } from "../../src/context/AuthProvider";

export default function UnauthorizedLayout() {
  const { user } = useAuth();
  console.log("UnauthorizedLayout", { user });
  useUnauthorizedRoute(user);

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            title: "Home",
          }}
        />
        <Stack.Screen
          name="login/index"
          options={{
            headerShown: true,
            title: "Login",
          }}
        />
        <Stack.Screen
          name="sign-up/index"
          options={{
            headerShown: true,
            title: "Sign Up",
          }}
        />
      </Stack>
    </>
  );
}
