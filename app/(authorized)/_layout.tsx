import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

import LogoutButton from "../../src/components/auth/LogoutButton";
import { CustomTheme } from "../../src/theme/theme.types";

export default function AuthorizedLayout() {
  const { colors } = useTheme<CustomTheme>();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Tabs
        screenOptions={{
          headerRight: () => <LogoutButton />,
          tabBarStyle: {
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: colors.background,

            paddingTop: 5,
            paddingBottom: 5,
            height: 65,
            borderWidth: 0,
            opacity: 1,
          },

          tabBarItemStyle: {
            borderRadius: 15,
            backgroundColor: "#fff",
            borderColor: "#000000",
            borderWidth: 1,
            maxWidth: 70,
            marginHorizontal: 20,
            paddingBottom: 5,
          },
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
          name="new-quest/index"
          options={{ title: "New Quest!", href: null }}
        />
        <Tabs.Screen
          name="quest/[id]"
          options={{ title: "Quest", href: null }}
        />
      </Tabs>
    </View>
  );
}
