import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, useTheme, Text } from "react-native-paper";

import ContainerView from "../../../src/components/ContainerView";
import ActiveQuestPackages from "../../../src/components/home/ActiveQuestPackages";
import GenerateNewQuestsSection from "../../../src/components/home/GenerateNewQuestsSection";
import { useAuth } from "../../../src/context/AuthProvider";
import { useRecentQuestPackages } from "../../../src/hooks/useRecentQuestPackages";
import { CustomTheme } from "../../../src/theme/theme.types";

export default function Home() {
  const { user, loadingUser } = useAuth();

  const [recentQuests, questsLoading, questsError] = useRecentQuestPackages(
    user,
    3,
  );

  const { colors } = useTheme<CustomTheme>();
  if (!user || loadingUser) {
    return <ActivityIndicator size="large" animating={loadingUser} />;
  }

  return (
    <ContainerView style={{ justifyContent: "flex-start" }}>
      <View
        style={{
          width: "100%",
          paddingVertical: 30,
          backgroundColor: colors.quaternaryContainer,
        }}
      >
        <GenerateNewQuestsSection />
      </View>

      <View style={{ width: "100%" }}>
        {questsError && <Text>Error loading quests</Text>}
        {questsLoading ? (
          <ActivityIndicator size="large" animating={questsLoading} />
        ) : (
          <View
            style={{
              width: "100%",
              borderTopWidth: 1,
              borderBottomWidth: 1,
              backgroundColor: colors.primaryContainer,
            }}
          >
            <ActiveQuestPackages activeQuestPackages={recentQuests} />
          </View>
        )}
      </View>
      <View
        style={{
          width: "100%",
          borderBottomWidth: 1,
          backgroundColor: colors.tertiaryContainer,
        }}
      >
        <View
          style={{
            width: "100%",
            paddingVertical: 30,
          }}
        >
          <View
            style={{
              padding: 20,
              paddingBottom: 0,
              backgroundColor: "inherit",
            }}
          >
            <Text variant="headlineMedium" style={{ fontWeight: "bold" }}>
              Completed Quest Packages
            </Text>
          </View>
          <View
            style={{
              padding: 20,
              paddingBottom: 20,
              backgroundColor: "inherit",
            }}
          >
            <Text variant="bodyLarge">No completed quest packages</Text>
          </View>
        </View>
      </View>
    </ContainerView>
  );
}
