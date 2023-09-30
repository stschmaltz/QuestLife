import React from "react";
import { View } from "react-native";

import QuestDescription from "./UnlockedQuestView/QuestDescription";
import { Quest } from "../../../services/firestore/quests/quest.types";
import ThemedButton from "../../themed/ThemedButton";

interface Props {
  quest: Quest;
  unlockQuest: (quest: Quest) => void;
}

const LockedQuestView: React.FC<Props> = ({ quest, unlockQuest }) => {
  return (
    <View style={{ flex: 1, width: "100%" }}>
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
        <View
          style={{
            paddingHorizontal: 40,
            paddingBottom: 20,
          }}
        >
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
      </View>
    </View>
  );
};

export default LockedQuestView;
