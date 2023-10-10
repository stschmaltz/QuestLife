import React from "react";
import { View } from "react-native";
import { ActivityIndicator, useTheme, Text } from "react-native-paper";

import ContainerView from "../../../src/components/ContainerView";
import ActiveQuestPackages from "../../../src/components/home/ActiveQuestPackages";
import CompletedQuestPackages from "../../../src/components/home/CompletedQuestPackages";
import GenerateNewQuestsSection from "../../../src/components/home/GenerateNewQuestsSection";
import { useAuth } from "../../../src/context/AuthProvider";
import { useFetchAllQuestPackages } from "../../../src/hooks/useFetchQuestPackages";
import { CustomTheme } from "../../../src/theme/theme.types";

export default function Home() {
  const { user, loadingUser } = useAuth();

  const [allQuestPackages, questPackagesLoading, fetchAllQuestPackagesError] =
    useFetchAllQuestPackages(user);

  const { colors } = useTheme<CustomTheme>();
  if (!user || loadingUser) {
    return <ActivityIndicator size="large" animating={loadingUser} />;
  }

  const activeQuestPackages = allQuestPackages.filter((questPackage) =>
    questPackage.quests.every((quest) => !quest.completedOn),
  );
  const completedQuestPackages = allQuestPackages.filter((questPackage) =>
    questPackage.quests.every((quest) => quest.completedOn),
  );

  console.log(
    "allQuestPackages",
    allQuestPackages,
    fetchAllQuestPackagesError,
    questPackagesLoading,
  );
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
        {fetchAllQuestPackagesError && <Text>Error loading quests</Text>}
        {questPackagesLoading ? (
          <ActivityIndicator size="large" animating={questPackagesLoading} />
        ) : (
          <View
            style={{
              width: "100%",
              borderTopWidth: 1,
              borderBottomWidth: 1,
              backgroundColor: colors.primaryContainer,
              minHeight: 200,
            }}
          >
            <ActiveQuestPackages questPackages={activeQuestPackages} />
          </View>
        )}
      </View>
      <View style={{ height: 10 }} />
      <View style={{ width: "100%" }}>
        {fetchAllQuestPackagesError && <Text>Error loading quests</Text>}
        {questPackagesLoading ? (
          <ActivityIndicator size="large" animating={questPackagesLoading} />
        ) : (
          <View
            style={{
              width: "100%",
              borderTopWidth: 1,
              borderBottomWidth: 1,
              backgroundColor: colors.tertiaryContainer,
              minHeight: 200,
            }}
          >
            <CompletedQuestPackages questPackages={completedQuestPackages} />
          </View>
        )}
      </View>
    </ContainerView>
  );
}
