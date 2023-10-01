import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ height: 100, justifyContent: "flex-end" }}>
        <Text>
          {user
            ? `User is signed in as ${user?.email}`
            : "User is not signed in"}
        </Text>
      </View>
      <View style={{ height: 400, justifyContent: "center" }}>
        <ThemedButton
          mode="contained"
          onPress={() => router.push("/new-quest")}
        >
          Generate a new set of quests!
        </ThemedButton>

        {questsError && <Text>Error loading quests</Text>}
        {questsLoading ? (
          <ActivityIndicator size="large" animating={questsLoading} />
        ) : (
          recentQuests.map((quest) => (
            <ThemedButton
              style={{ margin: 10, backgroundColor: colors.tertiary }}
              key={quest.id}
              mode="contained"
              onPress={() => router.push(`/quest/${quest.id}`)}
            >
              {quest.quests[0]?.challengeTitle || "No Quests"}
            </ThemedButton>
          ))
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
  },
});
