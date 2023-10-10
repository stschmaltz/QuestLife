import { useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";

import { QuestPackage } from "../../services/firestore/quests/quest.types";
import ThemedCard from "../themed/ThemedCard";

interface Props {
  questPackages: QuestPackage[];
}

const QuestPackageCarousel: React.FC<Props> = ({ questPackages }) => {
  const router = useRouter();

  return (
    <ScrollView
      horizontal
      style={{
        padding: 10,
        paddingBottom: 20,
        backgroundColor: "inherit",
      }}
    >
      {questPackages.map((questPackage: QuestPackage, index) => (
        <ThemedCard
          key={questPackage.id}
          style={{
            paddingVertical: 40,
            paddingHorizontal: 20,
            width: 150,
            height: 150,
            marginVertical: 10,
            marginHorizontal: 10,
            marginRight: index === questPackages.length - 1 ? 30 : 10,
          }}
          onPress={() => router.push(`/quest-package/${questPackage.id}`)}
        >
          <Text variant="bodyLarge">
            {questPackage.quests[0]?.challengeTitle || "No Quests"}
          </Text>
          <Text variant="bodySmall">
            {questPackage.quests[0]?.suggestedDuration}
          </Text>
        </ThemedCard>
      ))}
    </ScrollView>
  );
};

export default QuestPackageCarousel;
