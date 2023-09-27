import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import QuestTitle from "./QuestTitle";
import { Quest } from "../../../services/firestore/quests";
import ThemedButton from "../../themed/ThemedButton";

interface Props {
  quest: Quest;
  unlockQuest: (quest: Quest) => void;
}

const LockedQuestView: React.FC<Props> = ({ quest, unlockQuest }) => {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <QuestTitle title={quest.challengeTitle} />

      <Text variant="bodyLarge">{quest.challengeDescription}</Text>
      <Text variant="bodyLarge">{quest.suggestedDuration}</Text>
      <ThemedButton
        mode="contained"
        onPress={() => {
          unlockQuest(quest);
        }}
        style={{}}
      >
        Unlock Quest
      </ThemedButton>
    </View>
  );
};

export default LockedQuestView;
