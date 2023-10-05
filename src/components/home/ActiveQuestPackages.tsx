import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { QuestPackage } from "../../services/firestore/quests/quest.types";
import { CustomTheme } from "../../theme/theme.types";
import ThemedButton from "../themed/ThemedButton";
import ThemedCard from "../themed/ThemedCard";

interface Props {
  activeQuestPackages: QuestPackage[];
}

const ActiveQuestPackages: React.FC<Props> = ({ activeQuestPackages }) => {
  const { colors } = useTheme<CustomTheme>();
  const router = useRouter();

  return (
    <View
      style={{
        width: "90%",
        backgroundColor: colors.error,
        overflow: "scroll",
      }}
    >
      <Text variant="headlineMedium">Active Quest Packages</Text>
      <View style={{ flexDirection: "row" }}>
        {activeQuestPackages.map((questPackage: QuestPackage) => (
          <ThemedCard
            key={questPackage.id}
            style={{
              paddingVertical: 40,
              paddingHorizontal: 20,
              width: 150,
              height: 150,
              marginVertical: 10,
              marginHorizontal: 10,
            }}
            onPress={() => router.push(`/questPackage/${questPackage.id}`)}
          >
            <Text variant="bodyLarge">
              {questPackage.quests[0]?.challengeTitle || "No Quests"}
            </Text>
          </ThemedCard>
        ))}
      </View>
    </View>
  );
};

export default ActiveQuestPackages;
