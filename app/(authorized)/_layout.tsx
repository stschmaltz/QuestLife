import { Tabs } from "expo-router";
import React from "react";
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
        <Tabs.Screen name="prompt/index" options={{ title: "Prompt" }} />
        <Tabs.Screen
          name="new-challenge/index"
          options={{ title: "New Challenge!", href: null }}
        />
      </Tabs>
    </View>
  );
}
