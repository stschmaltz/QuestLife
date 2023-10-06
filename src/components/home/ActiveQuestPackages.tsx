import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

import { QuestPackage } from "../../services/firestore/quests/quest.types";
import ThemedCard from "../themed/ThemedCard";

interface Props {
  activeQuestPackages: QuestPackage[];
}

const ActiveQuestPackages: React.FC<Props> = ({ activeQuestPackages }) => {
  const router = useRouter();

  return (
    <View
      style={{
        width: "100%",
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
          Active Quest Packages
        </Text>
      </View>
      <ScrollView
        horizontal
        style={{
          padding: 10,
          paddingBottom: 20,
          backgroundColor: "inherit",
        }}
      >
        {activeQuestPackages.map((questPackage: QuestPackage, index) => (
          <ThemedCard
            key={questPackage.id}
            style={{
              paddingVertical: 40,
              paddingHorizontal: 20,
              width: 150,
              height: 150,
              marginVertical: 10,
              marginHorizontal: 10,
              marginRight: index === activeQuestPackages.length - 1 ? 30 : 10,
            }}
            onPress={() => router.push(`/quest-package/${questPackage.id}`)}
          >
            <Text variant="bodyLarge">
              {questPackage.quests[0]?.challengeTitle || "No Quests"}
            </Text>
            <Text variant="bodySmall">
              {questPackage.quests[0].suggestedDuration}
            </Text>
          </ThemedCard>
        ))}
      </ScrollView>
    </View>
  );
};

export default ActiveQuestPackages;
