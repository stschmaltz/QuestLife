import React from "react";
import { View } from "react-native";

import QuestDescription from "./QuestDescription";
import { Quest } from "../../../../services/firestore/quests/quest.types";
import ThemedButton from "../../../themed/ThemedButton";

interface Props {
  quest: Quest;
  completeQuest: (quest: Quest) => void;
}

const UnlockedQuestView: React.FC<Props> = ({ quest, completeQuest }) => {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      {/* <QuestActions
          onEnhance={() => {
            console.log("ENHANCE");
          }}
          onSwap={() => {
            console.log("SWAP");
          }}
        /> */}
      <View
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        <QuestDescription
          suggestedDuration={quest.suggestedDuration}
          description={quest.challengeDescription}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 40,
          paddingBottom: 20,
        }}
      >
        <ThemedButton
          mode="contained"
          onPress={() => {
            completeQuest(quest);
          }}
          style={{}}
        >
          Complete Quest
        </ThemedButton>
      </View>
    </View>
  );
};

export default UnlockedQuestView;
