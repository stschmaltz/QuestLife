import React from "react";
import { View } from "react-native";

import QuestActions from "./QuestActions";
import QuestDescription from "./QuestDescription";
import { Quest } from "../../../../services/firestore/quests";
import QuestTitle from "../QuestTitle";

interface Props {
  quest: Quest;
}

const UnlockedQuestView: React.FC<Props> = ({ quest }) => {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View style={{ width: "100%", flex: 1 }}>
        <QuestTitle title={quest.challengeTitle} />
      </View>
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
          paddingBottom: 50,
        }}
      >
        <QuestActions
          onEnhance={() => {
            console.log("ENHANCE");
          }}
          onSwap={() => {
            console.log("SWAP");
          }}
        />
      </View>
    </View>
  );
};

export default UnlockedQuestView;
