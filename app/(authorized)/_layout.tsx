import { Tabs } from "expo-router";
import { View } from "react-native";

import LogoutButton from "../../src/components/LogoutButton";
import { useAuth, useProtectedRoute } from "../../src/context/AuthProvider";

export default function AuthorizedLayout() {
  const { user } = useAuth();
  useProtectedRoute(user);

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerRight: () => <LogoutButton />,
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            title: "Home",
          }}
        />
        <Tabs.Screen name="account/index" options={{ title: "Account" }} />
      </Tabs>
    </View>
  );
}
