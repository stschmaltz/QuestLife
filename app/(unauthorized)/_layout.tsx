import { Stack } from "expo-router";

export default function UnauthorizedLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "red",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
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
