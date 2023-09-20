import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import ThemedButton from "../../themed/ThemedButton";

interface Props {
  onSelect: (value: "DAILY" | "WEEKLY" | "MONTHLY") => void;
}

const FrequencyScreen: React.FC<Props> = ({ onSelect }) => (
  <View>
    <Text>Select Frequency</Text>
    <ThemedButton onPress={() => onSelect("DAILY")}>Daily</ThemedButton>
    <ThemedButton onPress={() => onSelect("WEEKLY")}>Weekly</ThemedButton>
    <ThemedButton onPress={() => onSelect("MONTHLY")}>Monthly</ThemedButton>
  </View>
);

export default FrequencyScreen;
