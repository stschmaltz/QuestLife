import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import ThemedButton from "../../themed/ThemedButton";

interface Props {
  onSelect: (value: "SOLO" | "COUPLES" | "FRIENDS") => void;
}

const TypeScreen: React.FC<Props> = ({ onSelect }) => (
  <View>
    <Text>Select Type</Text>
    <ThemedButton onPress={() => onSelect("SOLO")}>Solo</ThemedButton>
    <ThemedButton onPress={() => onSelect("COUPLES")}>Couples</ThemedButton>
    <ThemedButton onPress={() => onSelect("FRIENDS")}>Friends</ThemedButton>
  </View>
);

export default TypeScreen;
