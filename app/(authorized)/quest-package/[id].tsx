import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

import ContainerView from "../../../src/components/ContainerView";
import ThemedButton from "../../../src/components/themed/ThemedButton";
import ThemedCard from "../../../src/components/themed/ThemedCard";
import { useAuth } from "../../../src/context/AuthProvider";
import useFetchQuest from "../../../src/hooks/useFetchQuestPackage";
import useFetchWizardOutput from "../../../src/hooks/useFetchWizardOutput";
function LoadingView() {
  return <ActivityIndicator size="large" />;
}

function ErrorView() {
  return <Text>Error Loading Quests</Text>;
}

export default function QuestPackagePage() {
  const params = useLocalSearchParams();
  const id = params.id as string;
  const { user, loadingUser } = useAuth();
  const router = useRouter();

  const {
    questPackage,
    error: fetchQuestError,
    loading: loadingQuest,
  } = useFetchQuest(id);

  const {
    wizardOutput,
    error: fetchWizardOutputError,
    loading: wizardOutputLoading,
  } = useFetchWizardOutput(questPackage?.wizardContextId);

  if (loadingUser || !user || wizardOutputLoading) {
    return <LoadingView />;
  }

  const activeQuest = questPackage?.quests.find(
    (quest) => quest.unlocked && !quest.completedOn,
  );

  return (
    <ContainerView style={{ padding: 20, justifyContent: "flex-start" }}>
      {loadingQuest && <LoadingView />}
      {fetchQuestError || (fetchWizardOutputError && <ErrorView />)}
      {questPackage && (
        <>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1 }}>
              <View>
                <Text style={{ fontWeight: "bold" }} variant="headlineMedium">
                  {questPackage.title}
                </Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <ThemedCard
                  contentStyle={{ paddingHorizontal: 20, paddingVertical: 15 }}
                >
                  <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                    Active Quest
                  </Text>
                  {activeQuest ? (
                    <Text>{activeQuest?.challengeTitle}</Text>
                  ) : (
                    <>
                      <Text>No current quests are active in this package.</Text>
                      <Text style={{ marginTop: 10 }}>
                        Click to unlock one now.
                      </Text>
                    </>
                  )}
                </ThemedCard>
              </View>
            </View>
            <View style={{ flex: 1, marginTop: 10, paddingLeft: 20 }}>
              {wizardOutput?.wizardContext && (
                <ThemedCard
                  contentStyle={{ paddingHorizontal: 20, paddingVertical: 15 }}
                >
                  <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                    Preferences
                  </Text>
                  <Text>
                    {wizardOutput.wizardContext.category?.label || ""}
                  </Text>
                  <Text>
                    {wizardOutput.wizardContext.objective?.label || ""}
                  </Text>
                  <Text>
                    {wizardOutput.wizardContext.duration?.label || ""}
                  </Text>
                  <Text>{wizardOutput.wizardContext.budget?.label || ""}</Text>
                  <Text>
                    Interests:{" "}
                    {wizardOutput.wizardContext.interests.length > 0
                      ? wizardOutput.wizardContext.interests.map(
                          (interest) => interest.label,
                        )
                      : "Radomized"}
                  </Text>
                </ThemedCard>
              )}
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <ThemedCard
              contentStyle={{
                paddingHorizontal: 20,
                paddingVertical: 15,
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                Completed
              </Text>
              <Text variant="headlineMedium">
                {
                  questPackage.quests.filter((quest) => !!quest.completedOn)
                    .length
                }{" "}
                /{questPackage.quests.length}
              </Text>
            </ThemedCard>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginTop: 30,
            }}
          >
            <ThemedButton
              mode="contained"
              onPress={() => router.push(`/quest/${questPackage.id}`)}
            >
              View Quests
            </ThemedButton>
            <ThemedButton mode="contained" onPress={() => {}}>
              Submit Feedback
            </ThemedButton>
          </View>
        </>
      )}
    </ContainerView>
  );
}
