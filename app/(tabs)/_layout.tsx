import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <>
      {/* <Stack
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
              title: "Home",
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              headerBackVisible: false,
              title: "Login",
            }}
          />
        </Stack> */}
      <Tabs>
        {/* The screens will now show up from left to right: index, settings, all other routes... */}
        <Tabs.Screen name="home" options={{ title: "Home" }} />
      </Tabs>
    </>
  );
}
