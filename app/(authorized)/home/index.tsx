import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

import ContainerView from "../../../src/components/ContainerView";
import ActiveQuestPackages from "../../../src/components/home/ActiveQuestPackages";
import ThemedButton from "../../../src/components/themed/ThemedButton";
import { useAuth } from "../../../src/context/AuthProvider";
import { useRecentQuestPackages } from "../../../src/hooks/useRecentQuestPackages";
import { CustomTheme } from "../../../src/theme/theme.types";

export default function Home() {
  const { user, loadingUser } = useAuth();
  const router = useRouter();

  const [recentQuests, questsLoading, questsError] = useRecentQuestPackages(
    user,
    3,
  );

  const { colors } = useTheme<CustomTheme>();
  if (!user || loadingUser) {
    return <ActivityIndicator size="large" animating={loadingUser} />;
  }

  return (
    <ContainerView>
      <View style={{ alignItems: "center", marginTop: 50 }}>
        <ThemedButton
          mode="contained"
          style={{ margin: 10, backgroundColor: colors.primary }}
          onPress={() => router.push("/new-quest")}
        >
          Generate a new set of quests!
        </ThemedButton>
      </View>

      <View style={{ flex: 1, width: "100%" }}>
        {questsError && <Text>Error loading quests</Text>}
        {questsLoading ? (
          <ActivityIndicator size="large" animating={questsLoading} />
        ) : (
          <ActiveQuestPackages activeQuestPackages={recentQuests} />
        )}
        {recentQuests.length > 0 && (
          <ThemedButton
            style={{ margin: 10, backgroundColor: colors.quaternary }}
            key={recentQuests[0].id}
            mode="contained"
            onPress={() => router.push(`/quest-package/${recentQuests[0].id}`)}
          >
            {recentQuests[0].title}
          </ThemedButton>
        )}
      </View>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
  },
});
