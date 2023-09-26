import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
import {
  ActivityIndicator,
  IconButton,
  MD3Colors,
  Text,
  useTheme,
} from "react-native-paper";

import ContainerView from "../../../src/components/ContainerView";
import { useAuth } from "../../../src/context/AuthProvider";
import useFetchQuest from "../../../src/hooks/useFetchQuestPackage";
import { CustomTheme } from "../../../src/types/theme";

export default function QuestPage() {
  const { colors } = useTheme<CustomTheme>();
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

  const activeQuestIndex = 0;

  return (
    <ContainerView
      style={{
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {loadingQuest && (
        <ActivityIndicator size="large" animating={loadingUser} />
      )}
      {fetchQuestError && <Text>Error loading quest</Text>}

      {questPackage && (
        <>
          <View
            style={{
              backgroundColor: colors.primaryContainer,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              maxHeight: 100,
            }}
          >
            <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
              {questPackage.title}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 40,
            }}
          >
            <Text variant="bodyLarge">
              {questPackage.quests[activeQuestIndex].challengeDescription}
            </Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                paddingTop: 30,
              }}
            >
              <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                Estimated Duration:{" "}
              </Text>
              <Text variant="bodyLarge" style={{}}>
                {questPackage.quests[activeQuestIndex].suggestedDuration}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-end",
              backgroundColor: colors.tertiaryContainer,
              paddingVertical: 20,
            }}
          >
            <Text
              variant="displaySmall"
              key={questPackage.quests[activeQuestIndex].challengeTitle}
            >
              {questPackage.quests[activeQuestIndex].challengeTitle}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              paddingBottom: 30,
              maxHeight: 120,
              width: "100%",
              backgroundColor: colors.quaternaryContainer,
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                width: "100%",
                paddingHorizontal: 40,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <IconButton
                icon="arrow-left"
                mode="contained"
                iconColor={colors.quaternary}
                size={40}
                style={{
                  borderColor: colors.quaternary,
                  borderWidth: 3,
                  backgroundColor: colors.quaternaryContainer,
                }}
                onPress={() => console.log("Pressed")}
              />
              <Text
                variant="headlineLarge"
                style={{ color: colors.quaternary, fontWeight: "bold" }}
              >
                {activeQuestIndex + 1}/{questPackage.quests.length}
              </Text>
              <IconButton
                icon="arrow-right"
                mode="contained"
                style={{
                  borderColor: colors.quaternary,
                  borderWidth: 3,
                  backgroundColor: colors.quaternaryContainer,
                }}
                iconColor={colors.quaternary}
                size={40}
                onPress={() => console.log("Pressed")}
              />
            </View>
          </View>
        </>
      )}
    </ContainerView>
  );
}
