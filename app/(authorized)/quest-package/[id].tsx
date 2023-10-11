import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  ActivityIndicator,
  ProgressBar,
  Text,
  useTheme,
} from "react-native-paper";

import ContainerView from "../../../src/components/ContainerView";
import ThemedButton from "../../../src/components/themed/ThemedButton";
import ThemedCard from "../../../src/components/themed/ThemedCard";
import { useAuth } from "../../../src/context/AuthProvider";
import { useQuestPackage } from "../../../src/context/QuestPackageContext";
import useFetchQuest from "../../../src/hooks/useFetchQuestPackage";
import useFetchWizardOutput from "../../../src/hooks/useFetchWizardOutput";
import { Quest } from "../../../src/services/firestore/quests/quest.types";
import { CustomTheme } from "../../../src/theme/theme.types";
import { getCompletedQuests } from "../../../src/utils/questHelper";
function LoadingView() {
  return <ActivityIndicator size="large" />;
}

function ErrorView() {
  return <Text>Error Loading Quests</Text>;
}

export default function QuestPackagePage() {
  const params = useLocalSearchParams();
  const { colors } = useTheme<CustomTheme>();
  const id = params.id as string;
  const { user, loadingUser } = useAuth();
  const router = useRouter();
  const { questPackage, setQuestPackage } = useQuestPackage();
  const [activeQuest, setActiveQuest] = useState<Quest | null | undefined>();

  const {
    questPackage: fetchedQuestPackage,
    error: fetchQuestError,
    loading: loadingQuest,
  } = useFetchQuest(id);

  const {
    wizardOutput,
    error: fetchWizardOutputError,
    loading: wizardOutputLoading,
  } = useFetchWizardOutput(questPackage?.wizardContextId);

  useEffect(() => {
    setQuestPackage(fetchedQuestPackage);
  }, [fetchedQuestPackage]);

  useEffect(() => {
    const activeQuest = questPackage?.quests.find(
      (quest) => quest.unlocked && !quest.completedOn,
    );
    setActiveQuest(activeQuest);
  }, [questPackage]);

  if (loadingUser || !user || wizardOutputLoading) {
    return <LoadingView />;
  }

  const completedQuests =
    questPackage?.quests && questPackage?.quests.length > 0
      ? getCompletedQuests(questPackage)
      : [];

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
                <Text
                  style={{ fontWeight: "bold", marginBottom: 30 }}
                  variant="headlineMedium"
                >
                  {questPackage.title}
                </Text>
              </View>
              <View>
                <ThemedCard
                  contentStyle={{
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                    minHeight: 150,
                  }}
                  style={{
                    backgroundColor: colors.secondary,
                  }}
                  onPress={() =>
                    router.push(
                      `/quest/${questPackage.id}?index=${
                        activeQuest?.initialIndex ?? 0
                      }`,
                    )
                  }
                >
                  <Text
                    variant="titleLarge"
                    style={{ fontWeight: "bold", marginBottom: 15 }}
                  >
                    Active Quest
                  </Text>
                  {activeQuest ? (
                    <View>
                      <Text
                        variant="titleMedium"
                        style={{ fontWeight: "bold" }}
                      >
                        {activeQuest?.challengeTitle}
                      </Text>
                      <Text variant="bodyLarge">
                        Duration: {activeQuest?.suggestedDuration}
                      </Text>
                    </View>
                  ) : (
                    <>
                      <Text variant="bodyLarge">
                        No current quests are active in this package.
                      </Text>
                      <Text variant="bodyLarge" style={{ marginTop: 10 }}>
                        Click to unlock one now.
                      </Text>
                    </>
                  )}
                </ThemedCard>
              </View>
            </View>
            <View style={{ flex: 1, marginTop: 0, paddingLeft: 20 }}>
              {wizardOutput?.wizardContext && (
                <ThemedCard
                  contentStyle={{
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                    minHeight: 250,
                  }}
                  style={{
                    backgroundColor: colors.tertiary,
                  }}
                >
                  <Text
                    variant="titleLarge"
                    style={{ fontWeight: "bold", marginBottom: 15 }}
                  >
                    Preferences
                  </Text>
                  <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                    • {wizardOutput.wizardContext.category?.label || ""}
                  </Text>
                  <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                    • {wizardOutput.wizardContext.objective?.label || ""}
                  </Text>
                  <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                    • {wizardOutput.wizardContext.duration?.label || ""}
                  </Text>
                  <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                    • {wizardOutput.wizardContext.budget?.label || ""}
                  </Text>
                  <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                    • Interests:{" "}
                  </Text>
                  <View style={{ marginLeft: 15 }}>
                    <Text variant="bodyMedium">
                      {wizardOutput.wizardContext.interests.length > 0
                        ? wizardOutput.wizardContext.interests
                            .map((interest) => interest.label)
                            .join(", ")
                        : "Radomized"}
                    </Text>
                  </View>
                </ThemedCard>
              )}
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <ThemedCard
              contentStyle={{
                paddingHorizontal: 20,
                paddingVertical: 15,
                minHeight: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
              style={{
                backgroundColor: colors.quaternary,
              }}
              onPress={() =>
                router.push(
                  `/quest/${questPackage.id}?index=${
                    completedQuests[0]?.initialIndex ?? 0
                  }`,
                )
              }
            >
              <Text
                variant="titleLarge"
                style={{ fontWeight: "bold", marginBottom: 15 }}
              >
                Completed
              </Text>
              <View style={{ flex: 1, width: "100%", marginBottom: 20 }}>
                <ProgressBar
                  progress={completedQuests.length / questPackage.quests.length}
                  animatedValue={
                    completedQuests.length / questPackage.quests.length
                  }
                  color={colors.primary}
                  style={{
                    width: "100%",
                    height: 15,
                    marginBottom: 100,
                    borderRadius: 20,
                    borderColor: colors.outline,
                    borderWidth: 1,
                  }}
                />
              </View>
              <Text variant="headlineMedium">
                {completedQuests?.length} /{questPackage.quests.length}
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
              View All Quests
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
