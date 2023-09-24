import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import ContainerView from "../../../src/components/ContainerView";
import { useAuth } from "../../../src/context/AuthProvider";
import useFetchQuest from "../../../src/hooks/useFetchQuestPackage";

export default function QuestPage() {
  const params = useLocalSearchParams();
  const id = params.id as string | undefined;
  const { user, loadingUser } = useAuth();

  const {
    questPackage,
    error: fetchQuestError,
    loading: loadingQuest,
  } = useFetchQuest(id);

  if (!user || loadingUser) {
    return null;
  }

  return (
    <ContainerView style={[styles.container]}>
      {loadingQuest && <Text>Loading...</Text>}
      {fetchQuestError && <Text>Error loading quest</Text>}
      {questPackage && <Text>{questPackage.title}</Text>}
      {questPackage?.quests.map((quest) => (
        <Text key={quest.challengeTitle}>{quest.challengeTitle}</Text>
      ))}
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
