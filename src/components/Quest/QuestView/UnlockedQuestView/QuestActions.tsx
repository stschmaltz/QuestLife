import React from "react";
import { View } from "react-native";

import ThemedButton from "../../../themed/ThemedButton";

interface Props {
  onSwap: () => void;
  onEnhance: () => void;
}

const QuestActions: React.FC<Props> = ({ onSwap, onEnhance }) => {
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "flex-end",
      }}
    >
      <ThemedButton mode="contained" onPress={onSwap}>
        Swap Quest
      </ThemedButton>
      <ThemedButton mode="contained" onPress={onEnhance}>
        Enhance Quest
      </ThemedButton>
    </View>
  );
};

export default QuestActions;
