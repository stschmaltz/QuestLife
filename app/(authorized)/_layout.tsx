import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import LogoutButton from "../../src/components/auth/LogoutButton";
import { QuestPackageProvider } from "../../src/context/QuestPackageContext";
import { CustomTheme } from "../../src/theme/theme.types";

export default function AuthorizedLayout() {
  const { colors } = useTheme<CustomTheme>();

  return (
    <QuestPackageProvider>
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
              minHeight: 65,
              elevation: 0,
              borderWidth: 0,
            },
            tabBarItemStyle: {
              borderRadius: 15,
              borderColor: "#000000",
              borderWidth: 1,
              maxWidth: 70,
              marginHorizontal: 20,
              paddingBottom: 5,
            },
            tabBarActiveBackgroundColor: colors.primaryContainer,
            tabBarInactiveBackgroundColor: colors.surface,
          }}
        >
          <Tabs.Screen
            name="home/index"
            options={{
              title: "Home",
              tabBarIcon: ({ focused, color, size }) => (
                <MaterialCommunityIcons
                  name="home"
                  color={focused ? colors.primary : color}
                  size={size}
                />
              ),
              tabBarLabel: ({ focused, color }) => (
                <Text
                  variant="labelMedium"
                  style={{ color: focused ? colors.primary : color }}
                >
                  Home
                </Text>
              ),
            }}
          />
          <Tabs.Screen
            name="account/index"
            options={{
              title: "Account",
              tabBarIcon: ({ focused, color, size }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={focused ? colors.primary : color}
                  size={size}
                />
              ),
              tabBarLabel: ({ focused, color }) => (
                <Text
                  variant="labelMedium"
                  style={{ color: focused ? colors.primary : color }}
                >
                  Account
                </Text>
              ),
            }}
          />
          <Tabs.Screen
            name="prompt/index"
            options={{
              title: "Prompt",
              tabBarIcon: ({ focused, color, size }) => (
                <MaterialCommunityIcons
                  name="robot-happy-outline"
                  color={focused ? colors.primary : color}
                  size={size}
                />
              ),
              tabBarLabel: ({ focused, color }) => (
                <Text
                  variant="labelMedium"
                  style={{ color: focused ? colors.primary : color }}
                >
                  Prompt
                </Text>
              ),
            }}
          />
          <Tabs.Screen
            name="new-quest/index"
            options={{ title: "New Quest!", href: null }}
          />
          <Tabs.Screen
            name="quest/[id]"
            options={{ title: "Quest", href: null }}
          />
          <Tabs.Screen
            name="quest-package/[id]"
            options={{ title: "Quest Package", href: null }}
          />
        </Tabs>
      </View>
    </QuestPackageProvider>
  );
}
