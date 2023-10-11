import { useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";

import { QuestPackage } from "../../services/firestore/quests/quest.types";
import { getCompletedQuests } from "../../utils/questHelper";
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
      {questPackages.map((questPackage: QuestPackage, index) => {
        const completedQuestCount = getCompletedQuests(questPackage).length;
        return (
          <ThemedCard
            key={questPackage.id}
            style={{
              padding: 20,
              width: 150,
              height: 150,
              marginVertical: 10,
              marginHorizontal: 10,
              marginRight: index === questPackages.length - 1 ? 30 : 10,
              alignItems: "center",
            }}
            onPress={() => router.push(`/quest-package/${questPackage.id}`)}
          >
            <Text variant="bodyLarge" style={{ textAlign: "center" }}>
              {questPackage.quests[0]?.challengeTitle || "No Quests"}
            </Text>
            <Text
              variant="bodySmall"
              style={{ textAlign: "center", marginTop: 5 }}
            >
              🕒 {questPackage.quests[0]?.suggestedDuration}
            </Text>
            <Text
              variant="bodySmall"
              style={{ textAlign: "center", marginTop: 3 }}
            >
              ✅ {completedQuestCount}/{questPackage.quests.length}
            </Text>
          </ThemedCard>
        );
      })}
    </ScrollView>
  );
};

export default QuestPackageCarousel;
