import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import ThemedButton from "../../themed/ThemedButton";

interface Props {
  onSelect: (value: "LOW" | "MEDIUM" | "HIGH") => void;
}

const BudgetScreen: React.FC<Props> = ({ onSelect }) => (
  <View>
    <Text>Select Budget Range</Text>
    <ThemedButton onPress={() => onSelect("LOW")}>Free Only</ThemedButton>
    <ThemedButton onPress={() => onSelect("MEDIUM")}>$0-$50</ThemedButton>
    <ThemedButton onPress={() => onSelect("HIGH")}>$0-$200</ThemedButton>
  </View>
);

export default BudgetScreen;
