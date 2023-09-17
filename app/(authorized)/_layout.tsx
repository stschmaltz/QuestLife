import { Tabs } from "expo-router";
import { View } from "react-native";

import LogoutButton from "../../src/components/LogoutButton";

export default function AuthorizedLayout() {
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
