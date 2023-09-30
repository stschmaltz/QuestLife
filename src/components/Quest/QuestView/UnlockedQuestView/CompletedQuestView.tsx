import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import QuestActionRow from "./QuestActionRow";
import QuestDescription from "./QuestDescription";
import { Quest } from "../../../../services/firestore/quests/quest.types";
import ThemedButton from "../../../themed/ThemedButton";

interface Props {
  quest: Quest;
  submitUserFeedback: (quest: Quest) => void;
  uploadMemories: (quest: Quest) => void;
}

const CompletedQuestView: React.FC<Props> = ({
  quest,
  submitUserFeedback,
  uploadMemories,
}) => {
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
          completedOn={quest.completedOn}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 40,
          paddingBottom: 20,
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <ThemedButton
          mode="contained"
          onPress={() => {
            submitUserFeedback(quest);
          }}
          style={{}}
        >
          Quest Feedback
        </ThemedButton>
        <ThemedButton
          mode="contained"
          onPress={() => {
            uploadMemories(quest);
          }}
          style={{}}
        >
          Upload Memories
        </ThemedButton>
      </View>
    </View>
  );
};

export default CompletedQuestView;
